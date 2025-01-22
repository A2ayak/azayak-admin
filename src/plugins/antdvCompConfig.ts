import { DatePicker, Modal, message } from 'ant-design-vue'
import dayjs from 'dayjs'

import { App } from 'vue'

export function setupAntdvCompConfig(app: App<Element>) {
	message.config({
		maxCount: 3,
		top: '110px',
	})
	DatePicker.RangePicker.props.defaultValue = [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')]
	Modal.props.keyboard = false
	Modal.props.maskClosable = false
	app.use(DatePicker).use(Modal)
}
