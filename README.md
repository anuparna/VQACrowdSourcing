
# Let's Agree to Disagree - A Crowdsourcing experiment to understand disagreement among answers to Visual Questions

In the realm of Visual Question Answering, some questions might have multiple answers from crowd-workers. 
This project is an attempt to learn about the disagreements among crowd-workers in answering a question based on an image.

## Dataset
A crowd-sourcing experiment was conducted on **Amazon Mechanical Turk (AMT)** with a sample of 144 images (48 each) from *VQA Real Dataset, VQA Abstract Scenes dataset and VizWiz dataset*.

## Setup
`Split_Questions_Answers.py`: A Python script used to generate `.input` files for AMT. This script currently uses VizWiz dataset.

`\data\input\*.input`: The `.input` files used to feed AMT.

`\data\images`: The image files from all 3 datasets - Total of 144 images, 48 from each dataset.

`\prototype\*.*`: Contains HTML, CSS and Javascript\Jquery files for interface display.

All code was executed using Amazon Mechanical Turk Command Line Tools (CLT).

## Workshop Presentation
A. Banerjee, S. Ojha, D. Gurari. "Let’s Agree to Disagree: A Meta-Analysis of Disagreement Among Crowdworkers During Visual Question Answering." <i>Workshop on Human Computation for Image and Video Analysis at AAAI Conference on Human Computation & Crowdsourcing (HCOMP GroupSight), Quebec City, Canada, October, 2017.</i><br/>
<a href="https://raw.githubusercontent.com/anuparna/VQACrowdSourcing/master/presentation/HCOMP_2017_Poster-Lets_agree_to_disagree.pdf">Poster</a><br/>
<a href="https://raw.githubusercontent.com/anuparna/VQACrowdSourcing/master/presentation/HCOMP%202017%20-%20Lets%20agree%20to%20disagree.pptx">Presentation</a>

