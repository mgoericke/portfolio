import boto3
import StringIO
import zipfile
import mimetypes
import json

def lambda_handler(event, context):
    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:eu-central-1:462891830141:deployPortfolioTopic')

    location = {
        "bucketName": "portfoliobuild.markgoericke.info",
        "objectKey" : "portfoliobuild.zip"

    }
    try:
        print "event " + str(event)
        job = event.get("CodePipeline.job")
        if job:
            for artifact in job["data"]["inputArtifacts"]:
                print "artifact " + str(artifact)
                print "artifact name " + str(artifact["name"])
                if artifact["name"] == "MyAppBuild":
                    location = artifact["location"]["s3Location"]

        print "Building portfolio from " + str(location)
        s3 = boto3.resource("s3")

        portfolio_bucket = s3.Bucket('portfolio.markgoericke.info')
        build_bucket = s3.Bucket(location["bucketName"])

        # in-memory zip file
        portfolio_zip = StringIO.StringIO()
        build_bucket.download_fileobj(location["objectKey"], portfolio_zip)

        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                portfolio_bucket.upload_fileobj(obj, nm, ExtraArgs={
                    'ContentType': str(mimetypes.guess_type(nm)[0]),
                    'ACL': 'public-read'
                })

        topic.publish(Subject="Portfolio Deployment", Message="Portfolio successfully deployed")
        if job:
            codepipeline = boto3.client('codepipeline')
            codepipeline.put_job_success_result(jobId=job["id"])
    except Exception as e:
        print "error " + e.message
        topic.publish(Subject="Portfolio Deployment Failed", Message="Portfolio deployment failed: " + e.message)
    return {
        'statusCode': 200,
        'body': json.dumps('Portfolio Deployment!')
    }
