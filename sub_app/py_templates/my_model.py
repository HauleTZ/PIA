#import numpy as np
#import pandas as pd
import os
#import torchvision
#from sqlparse.filters import output
from torchvision import transforms, datasets, models
import torch
import torch.nn as nn
#import torch.nn.functional as F
#from torch import optim, cuda
#from torch.utils.data import sampler, DataLoader
#import matplotlib.pyplot as plt
#import seaborn as sn
#import torch.optim as optim
#import tqdm as tqdm
#import cv2
#import glob
from torch.autograd import Variable
# Timing utility
#from timeit import default_timer as timer
from PIL import Image

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
#print(device)

modelV=os.path.join(os.path.dirname(os.path.dirname(__file__)),
                    'py_templates/pneumoniamodel.pth')

image_path=os.path.dirname(os.path.dirname(__file__))

classes=['NORMAL','PNEUMONIA']

transformer = transforms.Compose([transforms.Resize(size=224),
                                     transforms.CenterCrop(size=224),
                                     transforms.ToTensor(),
                                     transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
                                     ])


#torch.cuda.set_device('cpu')
model = models.vgg16()
# Add on classifier
model.classifier[6] = nn.Sequential(
                      nn.Linear(4096, 256),
                      nn.ReLU(),
                      nn.Dropout(0.4),
                      nn.Linear(256, 2),
                      nn.LogSoftmax(dim=1))
model.load_state_dict(torch.load(modelV, map_location=device))

#model=torch.load(modelV, map_location=lambda storage, loc: storage)
model.eval()


def prediction(url):
	url = image_path+url
	# read image by using pil package
	image = Image.open(url).convert('RGB')

	# transform image into tensor
	imageTensor = transformer(image).float()

	# add batch in our image
	imageTensor = imageTensor.unsqueeze_(0)
	#model.eval()

	# convert tensor into variable
	input = Variable(imageTensor)
	# now send image to the model



	output = model(input)
	# ouput will give array probability for each class
	# To get class name use the following

	index = output.data.numpy().argmax()
	pred = classes[index]
	percent = round(torch.max(output / torch.sum(output) * 100, 1).values.data.item(), 2)
	return  pred, percent
