function image = imageDetect(filename)
image = imread(filename);
I = rgb2gray(image);

%%For SURF Features:
% points = detectSURFFeatures(I,'MetricThreshold',1000,'NumOctaves',2);
% disp(points);
% for i=1:size(points)
%     disp(points(i).Location);
% end
% imshow(I);
% hold on;
% plot(points.selectStrongest(200));


%%SURF mixed with MSER:
% regions = detectMSERFeatures(I);
% [features, valid_points] = extractFeatures(I,regions);
% figure; imshow(I); hold on;
%     plot(valid_points.selectStrongest(200),'showOrientation',true);

%%For MSER Regions:
regions = detectMSERFeatures(I,'ThresholdDelta',3.0);
figure; imshow(I); hold on;
plot(regions); % by default, plot displays ellipses and centroids
disp(regions.size)
disp(regions.length)

%%For FAST features:
% corners = detectFASTFeatures(I);
% imshow(I); hold on;
% plot(corners.selectStrongest(50));

%%For Extract Features (Points) - based off of Harris:
% corners = detectHarrisFeatures(I);
% [features, valid_corners] = extractFeatures(I, corners);
%  figure; imshow(I); hold on
%   plot(valid_corners);
%   disp(valid_corners);

%%Edge detection
% BW1 = edge(I,'sobel');
% BW2 = edge(I,'canny');
% figure;
% imshowpair(BW1,BW2,'montage')
% title('Sobel Filter                                   Canny Filter');