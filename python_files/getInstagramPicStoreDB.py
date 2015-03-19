#!/usr/bin/python


import gridfs
from DB import MongoDB
import mimetypes
import requests
import sys

limit = 1000
ipAddress = "134.58.106.9"
db = "images"
collection = "instagram"

  
m = MongoDB(ipAddress, db)
m.m.admin.authenticate('lotte', 'intern3');
m.set_collection(collection)

thisDB = MongoDB("127.0.0.1", "images"); 
m.set_collection(collection)

gfsPhoto = gridfs.GridFS(thisDB.db, "instagram");

isExists = {"$exists" : False}
query = {"file" : isExists}

searchCursor = m.get_data_sorted(query,"created_at",limit,-1)

for curObj in searchCursor:
    _id = curObj["_id"]
    url = curObj["url"]  
    if(url.endswith(".jpg")):
	    mime_type = mimetypes.guess_type(url)[0]        
	    r = requests.get(url, stream=True)
	    _id = gfsPhoto.put(r.raw, contentType=mime_type, filename=_id)
	    print "created new gridfs file from {0} with id {1}".format(url, _id)
	    queryEntry = {"_id":_id}
	    #m.update(queryEntry,"file",True) <I cant do this now>

print "Complete"
sys.exit()