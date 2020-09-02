export default {
    type: "Flex.Item",
    title: "布局Item",
    container: true,
    props: {
        direction: 'row',
        wrap: 'nowrap',
        justify: "start",
        align: "center",
        style: {
            width: "100%",
            border: '1px dashed #000',
            minHeight: '4rem',
            padding: '0.1rem'
        }
    } 
}