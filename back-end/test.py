import cv2

capture = cv2.VideoCapture("rtmp://35.185.190.46/live/keios")

while True:
    ret, frame = capture.read()
    cv2.imshow('frame', frame)

    if cv2.waitKey(1) == ord('q'):
        break

capture.release()
cv2.destroyAllWindows()
