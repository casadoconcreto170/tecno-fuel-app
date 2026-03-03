gcloud builds submit --tag gcr.io/abastecimento-488316/tecno-concreto
gcloud auth login
y
gcloud auth login
gcloud builds submit --tag gcr.io/abastecimento-488316/tecno-concreto
cd tecno-app
ls
gcloud run deploy tecno-concreto --source . --region us-east1 --allow-unauthenticated
ls
gcloud run deploy tecno-concreto --source . --region us-east1 --allow-unauthenticated
gcloud auth login
gcloud run deploy tecno-concreto --source . --region us-east1 --allow-unauthenticated
# Dá permissão de administrador para a conta de build
gcloud projects add-iam-policy-binding abastecimento-488316     --member="serviceAccount:$(gcloud projects describe abastecimento-488316 --format='value(projectNumber)')@cloudbuild.gserviceaccount.com"     --role="roles/run.admin"
# Dá permissão para gerenciar o estoque de imagens
gcloud projects add-iam-policy-binding abastecimento-488316     --member="serviceAccount:$(gcloud projects describe abastecimento-488316 --format='value(projectNumber)')@cloudbuild.gserviceaccount.com"     --role="roles/artifactregistry.admin"
gcloud run deploy tecno-concreto --source . --region us-east1 --allow-unauthenticated --memory 2Gi
gcloud run deploy tecno-concreto-controle-de-combust-vel --source . --region us-west1 --allow-unauthenticated --memory 2Gi
gcloud run deploy tecno-concreto-controle-de-combust-vel --source . --region us-west1 --allow-unauthenticated --memory 1Gi
gcloud run deploy tecno-concreto-controle-de-combust-vel --source . --region us-west1 --allow-unauthenticated
gcloud run deploy tecno-concreto-controle-de-combust-vel --source . --region us-west1 --allow-unauthenticated --memory 1Gi
ls
git init
git add .
git commit -m "Versão para o Render"
git config --global user.email "tecnoconcretoeng@gmail.com"
git config --global user.name "casadoconcreto170"
git commit -m "Versão para o Render"
git remote add origin https://github.com/casadoconcreto170/tecno-fuel-app.git
git branch -M main
git push -u origin main
git init
git add .
git commit -m "Versão limpa para o Render"
git remote add origin https://github.com/casadoconcreto170/tecno-fuel-app.git
git branch -M main
git push -u origin main -f
rm -rf .git
git init
git add .
git commit -m "Versão final limpa"
git remote add origin https://github.com/casadoconcreto170/tecno-fuel-app.git
git branch -M main
git push -u origin main -f
rm -rf .git
rm -rf .cache
git init
git add .
git commit -m "Versão definitiva sem lixo"
git remote add origin https://github.com/casadoconcreto170/tecno-fuel-app.git
git branch -M main
git push -u origin main -f
git add .
git commit -m "Ajuste para o Render"
git push origin main
rm -rf .git
rm -rf .cache
git init
git add .
git commit -m "Versão final sem arquivos grandes"
git remote add origin https://github.com/casadoconcreto170/tecno-fuel-app.git
git branch -M main
git push -u origin main -f
