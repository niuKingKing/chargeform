<template>
    <el-container>
        <el-aside width="250px">
            <el-menu
                default-active="1"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <router-link to="/checkstatusquery"><el-menu-item index="1">检校状态查询</el-menu-item></router-link>
                <router-link to="/certificatesecurityquery"><el-menu-item index="2">证书防伪查询</el-menu-item></router-link>
                <router-link to="/servicecapabilityquery"><el-menu-item index="3">服务能力查询</el-menu-item></router-link>
                <router-link to="/chargingstandardsquery"><el-menu-item index="4">收费标准查询</el-menu-item></router-link>
                <router-link to="/pauseprojquery"><el-menu-item index="5">暂停项目查询</el-menu-item></router-link>
            </el-menu>
        </el-aside>
        <el-container>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

</script>
<style type="scss" scoped>
.el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-menu{
    height: 100vh;
}
.el-menu a:active{ text-decoration: unset;}

.el-main {
    color: #333;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container {
    height: 100vh;
}

/deep/.el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>