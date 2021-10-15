cd documents
curl -X POST \
    --data-binary @backup.json \
    --header "Content-Type:application/json" \
    "https://www.filestackapi.com/api/store/S3?key=AqRJLx9EHSVC45bTXrbVaz"