function numFeatures = imageDetection(filename)
image = imread(filename);
I = rgb2gray(image);
regions = detectMSERFeatures(I, 'ThresholdDelta', 3.0);
numFeatures = regions.length;
system(char(strcat({'python pushData.py '}, num2str(numFeatures))));
end
