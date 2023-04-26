/**
 * desc 表单减少if判断
 * @param allValidators 所有错误验证
 * @param allErrorTips  所有错误提示
 */
export const commonErrorTip = ({ allValidators, allErrorTips, callback }) => {
  const errorIndex = allValidators.findIndex((val) => val)
  errorIndex > -1 ? callback(new Error(allErrorTips[errorIndex])) : callback()
}

/**
 * 根据RFC, 99%正确率的表达式 http://emailregex.com/
 */
export const email =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * https://stackoverflow.com/questions/106179/regular-expression-to-match-dns-hostname-or-ip-address/14453696#14453696
 * 使用这个答案下的测试用例测试, 跟最高答案对比, 发该答案比最高答案靠谱
 */
export const ipv4 =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/

/**
 * 暂只支持http或https协议, 或省略协议的url
 * 来源: https://www.regextester.com/94502
 * 有更完善的版本, https://gist.github.com/dperini/729294, 但要懂得 trade-off, 目前这个够用了, 后面有问题再改进
 */
export const url =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=]+$/

// 号码大全(移动/联通/电信) https://www.chahaoba.com/%E6%89%8B%E6%9C%BA%E5%BD%92%E5%B1%9E
export const cellPhone =
  /^(13[0-9]|14[5-9]|15[0-9]|16[5-6]|17[0-35-8]|18[0-9]|19[1,8-9])\d{8}$|^(14[014]|174)0\d{7}$/

// 固定电话(不包含港澳台) 格式: 区号-号码
// 数据来源 http://tools.2345.com/yb.htm
// 很多人认为对应英语是 fixed-line telephone, 但有更简洁的说法 landline
// 英文翻译 https://www.thefreedictionary.com/fixed+line+telephone
// wiki https://zh.wikipedia.org/wiki/%E5%9B%BA%E7%BD%91%E7%94%B5%E4%BF%A1
export const landline = /^(0\d{2}-\d{8}|0\d{3}-\d{7})$/

/**
 * 旧版身份证 15位, 1999年开始强制实施新标准, 18位身份证, 多了2位年份(解决千年虫问题), 1位检验位
 * 18 位格式如下
 * AAAAAA YYYY MM DD NNS C
 * 前6位是 行政区划分代码 http://www.mca.gov.cn/article/sj/xzqh/2018/
 * 中间8位是 出生日期码 YYYY 代表年, MM 与 DD 分别代表 月 与 年, 高位不足则补0
 * 倒数后3位 是顺序码, 给同地址码同出生日期码的人编定的顺序. N 代表0-9的数字, S 表示性别, 奇数给男性, 偶数给女性. 即某地某年某月某日第一个出生的男性顺序码为: 001
 * 最后1位 是校验码. 0-10, 其中10用罗马数字X表示
 *
 * 计算方法 https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%85%AC%E6%B0%91%E8%BA%AB%E4%BB%BD%E5%8F%B7%E7%A0%81#%E6%A0%A1%E9%AA%8C%E7%A0%81%E8%AE%A1%E7%AE%97%E6%96%B9%E6%B3%95
 */
export const idCard =
  /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12]))\d{4}(((19\d{2}|[2-9]\d{3})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((19\d{2}|[2-9]\d{3})(0[13578]|1[02])31)|((19\d{2}|[2-9]\d{3})02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X)$|^[1-9]\d{7}((0\d)|(1[0-2]))(([012]\d)|3[0-1])\d{3}$/

/**
 * 中国大陆地区的邮政编码 六位数字
 * 以999开头的邮政编码是中国邮政国际地区(港澳台)业务邮政编码，实际上并未使用, 故在此校验不通过
 * https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%A2%83%E5%86%85%E5%9C%B0%E5%8C%BA%E9%82%AE%E6%94%BF%E7%BC%96%E7%A0%81%E5%88%97%E8%A1%A8
 */
export const postCode = /^[0-8]\d{5}$/

/**
 * 社会信用代码编码规则 http://home.saic.gov.cn/qyj/zyfb/gszjfb/201612/t20161208_232473.html
 * 更直接的回答 https://segmentfault.com/q/1010000007426939
 * 这是个简单的版本, 未对行政区域码作细致的校验
 */
export const socialCreditCode =
  /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/

export const chinese = /[\u4e00-\u9fa5]+$/

/**
 * 字母或数字
 */
export const alnum = /^[0-9a-zA-Z]+$/

/**
 * 大于等于1的整数
 */
export const posInt = /^[1-9]\d*$/
