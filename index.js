from ultralytics import YOLO
from ultralytics.yolo.v8.detect.predict import DetectionPredictor
import cv2


from ultralytics import YOLO
import cv2

model = YOLO("C:\\Users\\fujitsu\\Documents\\best.pt")
model.predict(source="0", show=True, conf=0.5)