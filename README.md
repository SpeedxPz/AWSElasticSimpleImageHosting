# Simple Image Hosting on AWS Elastic Beanstalk
Simple Node.js image hosting application that run on AWS S3 and Elastic Beanstalk 

## Requirements:
  - S3 Object Storage
  - Elastic Beanstalk
  
  
## Deployment
  Create Bucket and generate access key for this application
  Create node.js enverionment and upload this source code to Elastic Beanstalk and done!
  Setting up environment variable such as bucket name / access key/ secret key
  
### Environment Variables

Variable | Description 
--- | --- 
`BUCKET_NAME` | AWS S3 bucket name that use to store image files
`ACCESS_KEY` | AWS S3 access key that allow application to push object and pull object
`SECRET_KEY` | AWS S3 secret key that allow application to push object and pull object

### Contribution

I'm just node.js beginner
Pull request are welcome if you want to improve my bad code :)
