
# coding: utf-8

# In[89]:

from collections import Counter
import scipy.stats as stats
import pandas as pd
import os
import skimage.io as io
import matplotlib.pyplot as plt
import csv
import errno
import sys
import random

#reload(sys)  
#sys.setdefaultencoding('utf8')

def chunks(listItems, groupSize):
    #Generator function to yield chuncks of 4 from the list
    for i in range(0, len(listItems), groupSize):
        yield listItems[i:i + groupSize]

def produceLabel(answerList):
    entropy = stats.entropy(createFreqDistribution(answerList))
    return entropy

def createFreqDistribution(answerList):
    #print "before>>>"
    #print answerList
    #print "<<<<<<<<after>>>>>>"
    answerList=[ans.lower() for ans in answerList]
    #print answerList
    uniqueAnswers = Counter(answerList).keys()
    answersFrequencies = Counter(answerList).values()
    frequencyVector = []
    numSamples = 10
    for count in answersFrequencies:
        frequency = float(count)/float(numSamples)
        frequencyVector.append(frequency)

    numZeros = numSamples - len(answersFrequencies)
    for i in range(numZeros):
        frequencyVector.append(0)
    return frequencyVector


# In[90]:

def search_dictionary(key, value, list_of_dictionaries):
    return [element for element in list_of_dictionaries if element[key] == value]

# User-configurable parameter
baseDir = "D:/Study !/CPU-Vision/project/test/VQACrowdSourcing/data/"
imgDirPath = "https://www.cs.utexas.edu/~dgurari/Projects/vqAnswerCollection/" + "Images/"
vqasPath = baseDir + "Answers/answers.xls"
destPath = baseDir + "Res-Test/"

df = pd.read_excel(open(vqasPath,'rb'), sheetname='answers')
allHITResults = df['hitResult'].values

questionList = []
answersList = {}
entropyMoreHalf=[]
entropyBetweenHalfandThreeHalf=[]
entropyMoreThanThreeHalf=[]
checkCount=0
with open(destPath+'../testInput.input', 'wb') as csvfile:
    VQAWriter = csv.writer(csvfile,delimiter='\t', quoting=csv.QUOTE_MINIMAL)
    VQAWriter.writerow(["i1", "i2", "i3","i4"])
    for hit in allHITResults:
        processedhit = hit.replace("[", "")
        processedhit = processedhit.replace("]", "")
        processedhit = processedhit.replace("\"", "")
        processedhit = processedhit.replace("{", "")
        vqas = processedhit.split('}')
        for vqa in vqas:  # ignore last entry which will be blank            
            if (len(vqa) == 0):
                continue
            if (vqa[0] == ','):
                vqa = vqa[1:len(vqa)]
            imgIndex = vqa.find("imgID:")
            questionIndex = vqa.find("question:")
            answerIndex = vqa.find("answer:")
            answerConfIndex = vqa.find("ansConf:")
            imageName = vqa[imgIndex+6:questionIndex-1]
            question = vqa[questionIndex+9:answerIndex-1]
            answer = vqa[answerIndex+7:answerConfIndex-1]
            # answerConf = vqaPieces[3].replace("ansConf:","")
            dict = {'imageName': imageName, 'question': question}
            questionList.append(dict)
            answersList.setdefault(imageName, []).append(answer)
            imgPath = imgDirPath + imageName
            imgText = question + '\n'
            curAnswers = answersList.get(imageName)
            answers = '#'.join(map(str, curAnswers))
            if (len(curAnswers) == 10):
                entropyVal=produceLabel(curAnswers)
                if(entropyVal>1.5):
                    entropyMoreThanThreeHalf.append(imageName+"|"+question+"|"+answers+"|"+str(3)+"|"+"V")  
                elif(entropyVal>1.0 and entropyVal<1.5):
                    entropyBetweenHalfandThreeHalf.append(imageName+"|"+question+"|"+answers+"|"+str(2)+"|"+"V")
                elif(entropyVal>0.5):
                    entropyMoreHalf.append(imageName+"|"+question+"|"+answers+"|"+str(1)+"|"+"V")
                else:
                    checkCount+=1
                
                
    entropyMoreThanThreeHalf=random.sample(entropyMoreThanThreeHalf,16)
    entropyBetweenHalfandThreeHalf=random.sample(entropyBetweenHalfandThreeHalf,16)
    entropyMoreHalf=random.sample(entropyMoreHalf,16)
        
    for element in chunks(entropyMoreThanThreeHalf,4):
        VQAWriter.writerow(element)
    for element in chunks(entropyBetweenHalfandThreeHalf,4):
        VQAWriter.writerow(element)
    for element in chunks(entropyMoreHalf,4):
        VQAWriter.writerow(element)
        
    


# In[60]:


        


# In[ ]:



