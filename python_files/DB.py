#!/usr/bin/python

import pymongo
import sys

class MongoDB: 
    m, db, c;
  
    def __init__ (self, inputIP, inputDBName):
        try:
          self.m = MongoClient(inputIP, 27017)
          self.db = self.m.[inputDBName]
          print "**** Connection Successful"
        except BaseException as ex:
          print "**** Connection Failed"
          sys.exit()
    
    def set_collection(self, inputColName):
        try:
          self.c = self.db[inputColName]
        except BaseException as ex:
          print "**** Connection Failed"
          print "**** Exit"
          sys.exit();


    def get_one(self, inputQuery):
        return self.c.find_one(inputQuery)
  
    def get_data(self, inputQuery):
        return self.c.find(inputQuery);

    def get_data(self, inputQuery, inputLimit):
        return self.c.find(inputQuery).limit(inputLimit);
  
    def get_data_sorted(self, inputQuery, inputSortField, inputLimit, inSortSeq):
        return self.c.find(inputQuery).sort({inputSortField : inSortSeq}).limit(inputLimit)

    def get_distinct(self, inputField):
        return self.c.distinct(inputField)


    def get_distinct(self, inputField, inputQuery):
        return self.c.distinct(inputField, inputQuery) 
      
    def get_count(self):
        return self.c.count()
      
    def get count(self, inputQuery):
        return self.c.count(inputQuery)
      
    def update(self, inputQuery, inputField, inputVal):
        self.c.update(inputQuery, 
          {"$set" :
            {inputField : inputVal}
            }
        )

