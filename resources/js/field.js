import IndexField from './components/IndexField'
import DetailField from './components/DetailField'

Nova.booting((app, store) => {
    app.component('index-nova-tippy-field', IndexField)
    app.component('detail-nova-tippy-field', DetailField)
})
