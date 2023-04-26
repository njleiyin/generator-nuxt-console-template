/**
 * 全局注册组件
 */
import Vue from 'vue'
import {
  Button,
  Table,
  Pagination,
  TableColumn,
  Notification,
  Loading,
  Dialog,
  MessageBox,
  Message,
  Radio,
  Checkbox,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  DatePicker,
  Tooltip,
  Container,
  Main,
  Footer,
  Header,
  Menu,
  Submenu,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Tree,
  Switch,
  Breadcrumb,
  BreadcrumbItem,
  InputNumber,
  RadioGroup,
  CheckboxGroup,
  Tag,
  Tabs,
  TabPane,
  Carousel,
  CarouselItem,
  Divider,
  Image,
  Scrollbar,
  Popover,
  RadioButton,
  Drawer,
  Cascader,
  CascaderPanel,
  Transfer,
  Collapse,
  CollapseItem,
  Link,
  Upload,
  TimePicker,
  Badge,
  Calendar,
  Card,
  Steps,
  Step,
} from 'element-ui'

import ElFormRenderer from '@leiyin/el-form-renderer'
import ElDataTable from '@leiyin/el-data-table'

// 浏览器高度视图
const h = document.documentElement.clientHeight || document.body.clientHeight
// 计算表格组件最佳高度
const maxHeight = h - 190

Vue.prototype.$ELEMENT = { size: 'small' }
Vue.prototype.$ELDATATABLE = { minWidth: 100, 'show-overflow-tooltip': true, maxHeight }

Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Header)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Switch)
Vue.use(Loading.directive)
Vue.use(Dialog)
Vue.use(Tooltip)
Vue.use(Tree)
Vue.use(Tag)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(InputNumber)
Vue.use(RadioGroup)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(CascaderPanel)
Vue.use(Divider)
Vue.use(Image)
Vue.use(Scrollbar)
Vue.use(Popover)
Vue.use(RadioButton)
Vue.use(Drawer)
Vue.use(Cascader)
Vue.use(Transfer)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Link)
Vue.use(Upload)
Vue.use(TimePicker)
Vue.use(Badge)
Vue.use(Calendar)
Vue.use(Card)
Vue.use(Steps)
Vue.use(Step)

Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.$notify = Notification
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

Vue.component('ElDataTable', ElDataTable)
Vue.component('ElFormRenderer', ElFormRenderer)
