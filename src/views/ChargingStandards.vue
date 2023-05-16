<template>
    <div class="container">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
            <el-form-item label="样品名称" prop="samplename">
                <el-input v-model="form.samplename" placeholder="请输入样品名称"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-row>
                    <el-col :span="4"><el-input placeholder="请输入验证码" v-model="form.code"></el-input></el-col>
                    <el-col :span="2">
                        <div class="login-code" width="100%" @click="refreshCode">
                            <!--验证码组件-->
                            <verification-code :identifyCode="identifyCode"></verification-code>
                        </div>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleQuery">查询</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import verificationCode from "@/components/VerificationCode.vue";
import { checkChargeStandard } from '@/api/common';
export default {
    components: {
        verificationCode
    },
    data() {
        return {
            form: {
                code: "", //验证码输入框
                samplename: ""
            },
            identifyCodes: "1234567890abcdefjhijklinopqrsduvwxyz", //随机串内容,从这里随机抽几个显示验证码
            identifyCode: "", //验证码图片内容
            rules: {
                samplename: [
                    { required: true, message: '请输入样品名称', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                //通过循环获取字符串内随机几位
                this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
            }
        },
        //随机数字：用于当角标拿字符串的值
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        handleQuery() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.identifyCode != this.form.code) {
                        this.$message.warning("验证码不对");
                        this.form.code = ''
                        this.identifyCode = "";
                        this.makeCode(this.identifyCodes, 4);
                        return;
                    }
                    checkChargeStandard({
                        sampleName: this.form.samplename,
                        verifyCode: this.form.code
                    }).then(res => {
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.identifyCode = "";
                    this.makeCode(this.identifyCodes, 4);
                    return;
                }
            });
        },
        handleReset() {
            this.identifyCode = "";
            this.$refs.form.resetFields();
            this.makeCode(this.identifyCodes, 4);
        }
    },
    mounted() {
        //参数：（1）随机串内容。（2）验证码显示位数
        this.makeCode(this.identifyCodes, 4);
    }
}
</script>
<style lang="scss" scoped>
.container {
    height: 100%;
}
</style>