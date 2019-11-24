import boto3
import StringIO
import zipfile
import mimetypes
import json

def lambda_handler(event, context):
    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:eu-central-1:462891830141:deployPortfolioTopic')

    try:
        s3 = boto3.resource("s3")

        portfolio_bucket = s3.Bucket('portfolio.markgoericke.info')
        build_bucket = s3.Bucket('portfoliobuild.markgoericke.info')

        # in-memory zip file
        portfolio_zip = StringIO.StringIO()
        build_bucket.download_fileobj('portfoliobuild.zip', portfolio_zip)

        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                portfolio_bucket.upload_fileobj(obj, nm, ExtraArgs={
                    'ContentType': mimetypes.guess_type(nm)[0],
                    'ACL': 'public-read'
                })

        topic.publish(Subject="Portfolio Deployment", Message="Portfolio successfully deployed")
    except:
        topic.publish(Subject="Portfolio Deployment Failed", Message="Portfolio deployment failed")
    return {
        'statusCode': 200,
        'body': json.dumps('Portfolio Deployment!')
    }
