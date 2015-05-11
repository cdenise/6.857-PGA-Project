function numFeatures = imageDetection(filename)
image = imread(filename);
I = rgb2gray(image);
regions = detectMSERFeatures(I, 'ThresholdDelta', 3.0);
numFeatures = regions.length;
fileID = fopen('numRegions.txt', 'w');
fprintf(fileID, '%d\n', numFeatures);
fclose(fileID);
end
