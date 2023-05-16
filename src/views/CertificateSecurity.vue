<template>
    <div class="container">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
            <el-form-item label="编号" prop="certificatenumber">
                <el-input v-model="form.certificatenumber" placeholder="请输入证书编号或报告编号"></el-input>
            </el-form-item>
            <el-form-item label="证书单位名称" prop="certificateunit">
                <el-input v-model="form.certificateunit" placeholder="请输入证书单位名称"></el-input>
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

        <el-dialog title="证书防伪查询" :visible.sync="dialogVisible1" width="50%">
            <el-descriptions :column="2">
                <el-descriptions-item label="查询状态">{{ result.queryStatus }}</el-descriptions-item>
                <el-descriptions-item label="报告编号">{{ result.reportNumber }}</el-descriptions-item>
                <el-descriptions-item label="样品名称">{{ result.sampleName }}</el-descriptions-item>
                <el-descriptions-item label="规格型号">{{ result.model }}</el-descriptions-item>
                <el-descriptions-item label="生产日期">{{ result.produceDate }}</el-descriptions-item>
                <el-descriptions-item label="样品数量">{{ result.sampleNumber }}</el-descriptions-item>
                <el-descriptions-item label="送样日期">{{ result.sampleDate }}</el-descriptions-item>
                <el-descriptions-item label="检测依据">{{ result.detectionBasis }}</el-descriptions-item>
                <el-descriptions-item label="检测结果">{{ result.detectionResult }}</el-descriptions-item>
            </el-descriptions>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="证书防伪查询" :visible.sync="dialogVisible2" width="50%">
            <el-form ref="form2" :rules="rules2" :model="form2" label-width="120px">
                <el-form-item label="姓名" prop="fullName">
                    <el-input v-model="form2.fullName" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="telephone">
                    <el-input v-model="form2.telephone" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">提交</el-button>
                    <el-button @click="dialogVisible2 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import verificationCode from "@/components/VerificationCode.vue";
import { checkCertificate, saveContaction } from '@/api/common';
export default {
    components: {
        verificationCode
    },
    data() {
        return {
            form: {
                certificatenumber: '',
                code: "", //验证码输入框
                certificateunit: ""
            },
            identifyCodes: "1234567890abcdefjhijklinopqrsduvwxyz", //随机串内容,从这里随机抽几个显示验证码
            identifyCode: "", //验证码图片内容
            rules: {
                certificatenumber: [
                    { required: true, message: '请输入证书编号或报告编号', trigger: 'blur' }
                ],
                certificateunit: [
                    { required: true, message: '请输入证书单位名称', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            dialogVisible1: false,
            dialogVisible2: false,
            result: {},
            form2: {
                fullName: "",
                telephone: ""
            },
            rules2: {
                fullName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                telephone: [
                    { required: true, message: '请输入联系电话', trigger: 'blur' }
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
                    checkCertificate({
                        certificateNumber: this.form.certificatenumber,
                        certificateUnitName: this.form.certificateunit,
                        verifyCode: this.form.code
                    }).then(res => {
                        if (res.successCode == 200) {
                            this.dialogVisible1 = true;
                            this.result = res.result;
                            this.result.queryStatus = "报告查询成功"
                        } else {
                            this.dialogVisible2 = true;
                        }
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
        },
        handleSubmit() {
            this.$refs.form2.validate((valid) => {
                if (!valid) {
                    return;
                } else {
                    saveContaction({ ...this.form2 }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err)
                    })
                    this.$refs.form2.resetFields();
                    this.dialogVisible2 = false;
                }

            })
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