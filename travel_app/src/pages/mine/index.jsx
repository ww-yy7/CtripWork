//我的游记页面
/* 1.展示当前登录用户发布的游记列表
a)游记有待审核、已通过、未通过三种状态
b)未通过审核游记需展示拒绝原因（审核时录入）
c)实现游记编辑、删除功能。待审核、未通过状态可编辑，所有状态游记可删除（物理删除即可）
2.添加游记发布入口，点击跳转「游记发布」页 */
import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";

export default function Mine() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="mine">
      <Text>Hello world!</Text>
    </View>
  );
}
