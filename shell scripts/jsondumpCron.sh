ms=$(date --date=$(date +"%D") +%s%N | cut -b1-13)
path=/home/asro/Documents/$(date +%y-%m-%d)
mongodump -h 134.58.106.9 --authenticationDatabase admin --username reader --password mAy1ReAd0 -d rate -c flow -q '{created_at: {$gte: new Date('"$ms"')}}' --out "$path"
bsondump "$path"/rate/flow.bson > /var/www/html/count/"$(date +%Y-%m-%d)".json
