docker build -t gcr.io/customer-4dat/nodejs:v3.0
gcloud docker -- push gcr.io/customer-4dat/nodejs:v3.0
kubectl set image deployment/tool4dat-server tool4dat-server=gcr.io/customer-4dat/nodejs:v3.0