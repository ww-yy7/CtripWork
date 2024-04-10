import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";

export default function Agreement() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>《乐游记平台使用协议》</Text>
      <Text style={styles.date}>发布日期：2024年4月12日</Text>
      <Text style={styles.date}>生效日期：2024年4月12日</Text>

      <Text style={styles.sectionTitle}>提示条款</Text>
      <Text style={styles.paragraph}>
        【审慎阅读】您在申请登录流程中点击同意本协议之前，应当认真阅读本协议。请您务必
        审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决
        条款。重点条款将以粗体标识，您应仔细阅读。如您对协议有任何疑问，可通过本协议中
        提供的联系方式咨询。
      </Text>
      <Text style={styles.paragraph}>
        【签约动作】当您按照登录页面提示填写信息、阅读并同意本协议且完成全部登录程序
        后，即表示您已充分阅读、理解并接受本协议的全部内容，成为乐游记平台的用户。阅读本
        协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止登录程序。
      </Text>

      <Text style={styles.sectionTitle}>用户行为规范</Text>
      <Text style={styles.paragraph}>
        您在使用乐游记平台产品/服务时，必须遵守中华人民共和国相关法律法规的规定，您承诺将
        不会利用乐游记平台的产品/服务进行任何违法或不正当的活动，包括但不限于下列行为：
      </Text>
      <Text style={styles.subTitle}>
        1. 上载、展示、张贴、传播或以其它方式传送含有下列内容之一的信息:
      </Text>
      <Text style={styles.subParagraph}>
        <Text>· 反对宪法所确定的基本原则的；{"\n"}</Text>
        <Text>
          · 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；{"\n"}
        </Text>
        <Text>· 损害国家荣誉和利益的；{"\n"}</Text>
        <Text>· 煽动民族仇恨、民族歧视、破坏民族团结的；{"\n"}</Text>
        <Text>· 破坏国家宗教政策，宣扬邪教和封建迷信的；{"\n"}</Text>
        <Text>· 散布谣言，扰乱社会秩序，破坏社会稳定的；{"\n"}</Text>
        <Text>
          · 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；{"\n"}
        </Text>
        <Text>· 侮辱或者诽谤他人，侵害他人合法权利的；{"\n"}</Text>
        <Text>
          ·
          含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德
        </Text>
        <Text> 上令人反感的内容；{"\n"}</Text>
        <Text>
          ·
          可能引发未成年人模仿不安全行为或违反社会公德行为、诱导未成年人不良嗜好等的；
          {"\n"}
        </Text>
        <Text>
          ·
          含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的。
        </Text>
      </Text>

      <Text style={styles.subTitle}>
        (2)为任何非法目的而访问乐游记平台或使用乐游记产品/服务，或未经允许，利用乐游记平台从事以下活动：
      </Text>
      <Text style={styles.subParagraph}>
        <Text>
          · 未经允许，进入计算机信息网络或者非法获取、使用计算机信息网络资源的；
          {"\n"}
        </Text>
        <Text>
          · 未经允许，对计算机信息网络功能进行删除、修改或者增加的；{"\n"}
        </Text>
        <Text>
          ·
          未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；
          {"\n"}
        </Text>
        <Text>· 未经允许使用乐游记平台上展示的资料；{"\n"}</Text>
        <Text>
          ·从事洗钱、窃取商业秘密、窃取个人信息、违规套现、假冒乐游记发布任何虚假或诈骗信
          息等违法违规活动。{"\n"}
        </Text>
      </Text>
      <Text style={styles.subParagraph}>
        上述行为的发生，将视为您对本协议的根本违约。在任何情况下，乐游记平台一旦合理地认
        为您存在或可能存在上述行为的，可以在任何时候，不经事先通知删除您散布或传播的任
        何信息，并中止或终止向您提供乐游记平台的产品/服务。您需对自己在访问乐游记平台或使用
        乐游记平台的产品/服务中的行为承担法律责任。您若在乐游记平台散布或传播以上违反国家法
        律法规或公序良俗的信息，乐游记平台的系统记录将有可能作为您违法犯罪的证据向有关部
        门提供。
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f9",
    padding: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  subParagraph: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 10,
    marginBottom: 10,
    paddingBottom: 10,
  },
});
