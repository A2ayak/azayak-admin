import { App, createApp } from 'vue'
import XEUtils from 'xe-utils'
import {
	VXETable, // 全局对象

	// 表格功能
	// Filter,
	// Edit,
	// Menu,
	// Export,
	// Keyboard,
	// Validator,

	// 可选组件
	// Icon,
	Column,
	// Colgroup,
	// Grid,
	// Tooltip,
	// Toolbar,
	// Pager,
	// Form,
	// FormItem,
	// FormGather,
	// Checkbox,
	// CheckboxGroup,
	// Radio,
	// RadioGroup,
	// RadioButton,
	// Switch,
	// Input,
	// Select,
	// Optgroup,
	// Option,
	// Textarea,
	// Button,
	// Modal,
	// List,
	// Pulldown,
	Table, // 表格
} from 'vxe-table'
// import zhCN from 'vxe-table/es/locale/lang/zh-CN'
import 'vxe-table/lib/style.css'

import { App } from 'vue'

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.config({
	// size: null, // 全局尺寸
	// zIndex: 999, // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡；新版本可以使用 dom-zindex 共享配置
	// version: 0, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
	// loadingText: '加载中...', // 全局loading提示内容，如果为null则不显示文本
	table: {
		// showHeader: true,
		// keepSource: false,
		// showOverflow: null,
		// showHeaderOverflow: null,
		// showFooterOverflow: null,
		// size: null,
		// autoResize: false,
		// border: false,
		// round: false,
		// emptyText: '暂无数据',
		rowConfig: {
			keyField: '_X_ROW_KEY', // 行数据的唯一主键字段名
			isHover: true,
			isCurrent: true,
		},
		// radioConfig: {
		// 	trigger: 'default',
		// },
		// checkboxConfig: {
		// 	strict: false,
		// 	highlight: false,
		// 	range: false,
		// 	trigger: 'default',
		// },
		// filterConfig: {
		// 	remote: false,
		// 	filterMethod: null,
		// },
		// expandConfig: {
		// 	trigger: 'default',
		// 	showIcon: true,
		// },
		// treeConfig: {
		// 	rowField: 'id',
		// 	parentField: 'parentId',
		// 	children: 'children',
		// 	hasChild: 'hasChild',
		// 	mapChildren: '_X_ROW_CHILD',
		// 	indent: 20,
		// 	showIcon: true,
		// },
		// tooltipConfig: {
		// 	enterable: true,
		// },
		// scrollY: {
		// 	enabled: false, // 是否默认开启纵向虚拟滚动
		// 	gt: 100, // 当数据大于指定数量时自动触发启用虚拟滚动
		// },
	},
	// grid: {
	//   size: null,
	//   zoomConfig: {
	//     escRestore: true
	//   },
	//   pagerConfig: {
	//     perfect: false
	//   },
	//   toolbarConfig: {
	//     perfect: false
	//   },
	//   proxyConfig: {
	//     autoLoad: true,
	//     message: true,
	//     props: {
	//       list: null, // 用于列表，读取响应数据
	//       result: 'result', // 用于分页，读取响应数据
	//       total: 'page.total' // 用于分页，读取总条数
	//     }
	//     beforeItem: null,
	//     beforeColumn: null,
	//     beforeQuery: null,
	//     afterQuery: null,
	//     beforeDelete: null,
	//     afterDelete: null,
	//     beforeSave: null,
	//     afterSave: null
	//   }
	// },
	// pager: {
	//   size: null,
	//   autoHidden: false,
	//   perfect: true,
	//   pageSize: 10,
	//   pagerCount: 7,
	//   pageSizes: [10, 15, 20, 50, 100],
	//   layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
	// },
	// form: {
	//   preventSubmit: false
	//   size: null,
	//   colon: false,
	//   validConfig: {
	//     autoPos: true
	//   },
	//   tooltipConfig: {
	//     enterable: true
	//   },
	//   titleAsterisk: true
	// },
	// input: {
	//   size: null,
	//   transfer: false
	//   parseFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
	//   labelFormat: '',
	//   valueFormat: '',
	//   startDay: 1,
	//   digits: 2,
	//   controls: true
	// },
	// textarea: {
	//   size: null
	//   autosize: {
	//     minRows: 1,
	//     maxRows: 10
	//   }
	// },
	// select: {
	//   size: null,
	//   transfer: false,
	//   optionConfig: {
	//     keyField: '_X_OPTION_KEY' // 选项数据的唯一主键字段名
	//   },
	//   multiCharOverflow: 8
	// },
	// toolbar: {
	//   size: null,
	//   import: {
	//     mode: 'covering'
	//   },
	//   export: {
	//     types: ['csv', 'html', 'xml', 'txt']
	//   },
	//   custom: {
	//     isFooter: true
	//   },
	//   buttons: [],
	//   tools: []
	// },
	// button: {
	//   size: null,
	//   transfer: false
	// },
	// radio: {
	//   size: null
	// },
	// checkbox: {
	//   size: null
	// },
	// switch: {
	//   size: null
	// },
	// modal: {
	//   // size: null,
	//   minWidth: 340,
	//   minHeight: 200,
	//   lockView: true,
	//   mask: true,
	//   duration: 3000,
	//   marginSize: 0,
	//   dblclickZoom: true,
	//   showTitleOverflow: true
	//   storage: false
	// },
	// list: {
	//   scrollY: {
	//     gt: 100
	//   }
	// }
})

export function setVxeTableConfig(app: App<Element>) {
	app.use(Column).use(Table)
}
