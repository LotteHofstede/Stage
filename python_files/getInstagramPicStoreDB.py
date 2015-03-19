import gridfs
import DB


limit = 1000
ipAddress = "127.0.0.1"
db = "images"
people = "isGeo"

fs = gridfs.GridFS(db)
  
m = new MongoDB(ipAddress, db)
m.setCollection(people)

gfsPhoto = gridfs.GridFS(m.m, m.db)

isExists = {"$exists": false}
query = {"file" : isExists}

searchCursor = m.get_data_sorted(query,"created_at",limit,-1)

for curObj in searchCursor:
    _id = curObj["_id"]
    url = curObj["url"]  
    if(url.endswith(".jpg")):
    mime_type = mimetypes.guess_type(url)[0]        
    r = requests.get(url, stream=True)
    _id = gfsPhoto.put(r.raw, contentType=mime_type, filename=_id)
    print "created new gridfs file {0} with id {1}".format(gridfs_filename, _id)
    queryEntry = {"_id":_id}
    m.update(queryEntry,"file",true)

  
  print "Complete"
  exit()