
# Let's Agree to Disagree - A Crowdsourcing experiment to understand disagreement among answers to Visual Questions

In the realm of Visual Question Answering, some questions might have multiple answers from crowd-workers. 
This project is an attempt to learn about the disagreements among crowd-workers in answering a question based on an image.

## Dataset
A crowd-sourcing experiment was conducted on **Amazon Mechanical Turk (AMT)** with a sample of 144 images (48 each) from *VQA Real Dataset, VQA Abstract Scenes dataset and VizWiz dataset*.

## Setup
`Split_Questions_Answers.py`: A Python script used to generate `.input` files for AMT. This script currently uses VizWiz dataset.

`\data\input\*.input`: The `.input` files used to feed AMT.

`\data\images`: The image files from all 3 datasets - Total of 144 images, 48 from each dataset.

`\prototype\*.*`: Contains HTML, CSS and Javascript\Jquery files for interface display
