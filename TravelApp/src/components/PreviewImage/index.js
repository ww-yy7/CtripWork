import React from "react";
import { View, Dimensions } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

// 自定义vw vh函数
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const vw = (percentageWidth) => {
  return (screenWidth * percentageWidth) / 100;
};

const vh = (percentageHeight) => {
  return (screenHeight * percentageHeight) / 100;
};

//  通过props传参 images: [{url: '图片地址(或者是base64形式的)'}] , selectedImageIndex: 选中的图片索引
export default function PreviewImage({ images, selectedImageIndex }) {
  return (
    <View style={{ height: vh(60) }}>
      <ImageViewer
        imageUrls={images}
        index={parseInt(selectedImageIndex)}
        style={{
          width: vw(100),
        }}
      />
    </View>
  );
}
