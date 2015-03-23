ms=$(date --date=$(date +"%D") +%s%N | cut -b1-13)
path=/home/asro/Documents/$(date +%y-%m-%d)
mongodump -d twitter -c count -q '{date: {$gte: new Date('"$ms"')}}' --out "$path"
bsondump "$path"/twitter/count.bson > /var/www/html/"$(date +%Y-%m-%d)".json
