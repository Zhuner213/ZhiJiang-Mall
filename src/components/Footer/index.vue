<template>
  <div class="copyright">
    <div class="wrap">
      <ul class="clear">
        <li>公司介绍</li>
        <li>开发团队</li>
        <li>招聘信息</li>
        <li>联系我们</li>
        <li style="width: 110px">个人信息保护政策</li>
        <li style="width: 110px">枝江商城用户协议</li>
        <li style="width: 110px">枝江商城服务协议</li>
        <li style="width: 75px">Cookie协议</li>
        <li>纠纷处理</li>
        <li>网站地图</li>
      </ul>
      <div class="text">
        京ICP证：
        <font>050016号</font>
        <font>营业执照</font>
        《网络文化经营许可证》编号：
        <font>京网文[2020]6170-1220号</font>
        《网络视听许可证》编号：
        <font>0110587</font>
        京公网安备
        <font>11010502033859号</font>
        <br />
        ©枝江商城 版权所有 A-Soul. All Rights Reserved.
      </div>
      <div class="link">
        <img src="http://static.wanmei.com/shop/images/copyright02.jpg" />
        <img src="http://static.wanmei.com/shop/images/copyright05.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.copyright {
	padding: 25px 0 30px 0;
	text-align: center;
}
.copyright .wrap {
	width: 1200px;
	margin: 0 auto;
}
.copyright ul {
	width: 825px;
	margin: 0 auto;
	zoom: 1;
	overflow: hidden;
    /* list-style: none; */
}
.copyright li {
	float: left;
	width: 70px;
	height: 12px;
	line-height: 12px;
	border-right: 1px solid #ddd;
	text-align: center;
	margin-right: -1px;
	font-size: 12px;
	color: #666;
	cursor: pointer;
}
.copyright li:hover {
	color: #E90404;
}
.copyright .text {
	padding: 24px 0 15px 0;
	color: #999;
	font-size: 12px;
}
.copyright .text font {
	color: #666;
	cursor: pointer;
}
.copyright .text font:hover {
	color: #E90404;
}
.copyright .link img {
	margin: 0 3px;
	cursor: pointer;
}
</style>