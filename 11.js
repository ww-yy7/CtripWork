<ImageBackground
source={require("../../../assets/images/headerbg.png")} // 替换成你的背景图片路径
style={styles.noLoginHeader}>
<View style={{ paddingTop: 30, alignItems: "center" }}>
  <Card style={styles.loginCard}>
    <Image
      source={require("../../../assets/images/logo.png")}
      style={{
        marginTop: 10,
        width: 100,
        height: 100,
        alignSelf: "center",
        borderRadius: 50,
      }}
    />
    <Text style={styles.noLoginText}>你的快乐旅游记</Text> 
    <View style={styles.changeBtn}>
      <Button
        type="primary"
        onPress={() => navigation.navigate("Login")}
        style={styles.loginLeftBtn}>
        登录/注册
      </Button>
    </View>
  </Card>
</View>
</ImageBackground>