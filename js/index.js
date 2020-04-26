layui.config({
    base: "js/"
}).use(['form', 'element', 'jquery', 'tree', 'table', 'laypage', 'layer'], function () {
    const form = layui.form
    const element = layui.element
    const $ = layui.jquery;
    const tree = layui.tree
    const table = layui.table
    const layPage = layui.laypage
    const layer = layui.layer
    // 数据定义
    const ListData = [
        {
        title: '江西',
        id: 1,
        spread: true,
        children: [
            {
                title: '南昌',
                id: 1000,
                children: [
                    {
                    title: '青山湖区',
                    id: 10001
                    },
                    {
                    title: '高新区'
                    , id: 10002
                    }]
            },
            {
                title: '九江',
                id: 1001
            },
            {
                title: '赣州',
                id: 1002
            }]
        }
    ]
    // 前端查询数据
    const tableData = [
        {"id":10000,"username":"user-0","sex":"女","city":"城市-0","sign":"签名-0","experience":255,"logins":24,"wealth":82830700,"classify":"作家","score":57},{"id":10001,"username":"user-1","sex":"男","city":"城市-1","sign":"签名-1","experience":884,"logins":58,"wealth":64928690,"classify":"词人","score":27},{"id":10002,"username":"user-2","sex":"女","city":"城市-2","sign":"签名-2","experience":650,"logins":77,"wealth":6298078,"classify":"酱油","score":31},{"id":10003,"username":"user-3","sex":"女","city":"城市-3","sign":"签名-3","experience":362,"logins":157,"wealth":37117017,"classify":"诗人","score":68},{"id":10004,"username":"user-4","sex":"男","city":"城市-4","sign":"签名-4","experience":807,"logins":51,"wealth":76263262,"classify":"作家","score":6},{"id":10005,"username":"user-5","sex":"女","city":"城市-5","sign":"签名-5","experience":173,"logins":68,"wealth":60344147,"classify":"作家","score":87},{"id":10006,"username":"user-6","sex":"女","city":"城市-6","sign":"签名-6","experience":982,"logins":37,"wealth":57768166,"classify":"作家","score":34},{"id":10007,"username":"user-7","sex":"男","city":"城市-7","sign":"签名-7","experience":727,"logins":150,"wealth":82030578,"classify":"作家","score":28},{"id":10008,"username":"user-8","sex":"男","city":"城市-8","sign":"签名-8","experience":951,"logins":133,"wealth":16503371,"classify":"词人","score":14},{"id":10009,"username":"user-9","sex":"女","city":"城市-9","sign":"签名-9","experience":484,"logins":25,"wealth":86801934,"classify":"词人","score":75},{"id":10010,"username":"user-10","sex":"女","city":"城市-10","sign":"签名-10","experience":1016,"logins":182,"wealth":71294671,"classify":"诗人","score":34},{"id":10011,"username":"user-11","sex":"女","city":"城市-11","sign":"签名-11","experience":492,"logins":107,"wealth":8062783,"classify":"诗人","score":6},{"id":10012,"username":"user-12","sex":"女","city":"城市-12","sign":"签名-12","experience":106,"logins":176,"wealth":42622704,"classify":"词人","score":54},{"id":10013,"username":"user-13","sex":"男","city":"城市-13","sign":"签名-13","experience":1047,"logins":94,"wealth":59508583,"classify":"诗人","score":63},{"id":10014,"username":"user-14","sex":"男","city":"城市-14","sign":"签名-14","experience":873,"logins":116,"wealth":72549912,"classify":"词人","score":8},{"id":10015,"username":"user-15","sex":"女","city":"城市-15","sign":"签名-15","experience":1068,"logins":27,"wealth":52737025,"classify":"作家","score":28},{"id":10016,"username":"user-16","sex":"女","city":"城市-16","sign":"签名-16","experience":862,"logins":168,"wealth":37069775,"classify":"酱油","score":86},{"id":10017,"username":"user-17","sex":"女","city":"城市-17","sign":"签名-17","experience":1060,"logins":187,"wealth":66099525,"classify":"作家","score":69},{"id":10018,"username":"user-18","sex":"女","city":"城市-18","sign":"签名-18","experience":866,"logins":88,"wealth":81722326,"classify":"词人","score":74},{"id":10019,"username":"user-19","sex":"女","city":"城市-19","sign":"签名-19","experience":682,"logins":106,"wealth":68647362,"classify":"词人","score":51},{"id":10020,"username":"user-20","sex":"男","city":"城市-20","sign":"签名-20","experience":770,"logins":24,"wealth":92420248,"classify":"诗人","score":87},{"id":10021,"username":"user-21","sex":"男","city":"城市-21","sign":"签名-21","experience":184,"logins":131,"wealth":71566045,"classify":"词人","score":99},{"id":10022,"username":"user-22","sex":"男","city":"城市-22","sign":"签名-22","experience":739,"logins":152,"wealth":60907929,"classify":"作家","score":18},{"id":10023,"username":"user-23","sex":"女","city":"城市-23","sign":"签名-23","experience":127,"logins":82,"wealth":14765943,"classify":"作家","score":30},{"id":10024,"username":"user-24","sex":"女","city":"城市-24","sign":"签名-24","experience":212,"logins":133,"wealth":59011052,"classify":"词人","score":76},{"id":10025,"username":"user-25","sex":"女","city":"城市-25","sign":"签名-25","experience":938,"logins":182,"wealth":91183097,"classify":"作家","score":69},{"id":10026,"username":"user-26","sex":"男","city":"城市-26","sign":"签名-26","experience":978,"logins":7,"wealth":48008413,"classify":"作家","score":65},{"id":10027,"username":"user-27","sex":"女","city":"城市-27","sign":"签名-27","experience":371,"logins":44,"wealth":64419691,"classify":"诗人","score":60},{"id":10028,"username":"user-28","sex":"女","city":"城市-28","sign":"签名-28","experience":977,"logins":21,"wealth":75935022,"classify":"作家","score":37},{"id":10029,"username":"user-29","sex":"男","city":"城市-29","sign":"签名-29","experience":647,"logins":107,"wealth":97450636,"classify":"酱油","score":27}] //全部数据
    let afterFilterTableData = [] // 查询条件过滤后数据
    let currentTable = [] // 表格当前页面数据
    const refreshCondition = {username:'',city:'',experience:'', sex:'男'} // 查询条件刷新
   //自定义验证规则
    form.verify({
        username: function (value) {
            if (value.length < 2) {
                return '标题至少得2个字符啊';
            }
        }/*,
        experience: [/^\d{1,}$/, '只能是数字！'],
        email: [/^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$|^1[3|4|5|7|8]\d{9}$/, '邮箱格式不对']*/
    })
    // 触发查询
    form.on('submit(searchMsg)', data => {
        getAfterConditionMsg(data.field)
    })
    // 刷新
    form.on('submit(searchRefreshMsg)', () => {
        getAfterConditionMsg(refreshCondition)
    })
    // 树
    tree.render({
        elem: '#testTree', //默认是点击节点可进行收缩
        data: ListData,
        showCheckbox: true,
        id: 'id',
        edit: ['add', 'update', 'del'],
        oncheck: checkObj => {
            console.log(checkObj)

        },
        operate: obj => {
            // 处理新增编辑删除
            // 可直接通过后台修改数据，以下为纯前端操作实现增删改
            console.log(obj)
            if (obj.type === 'add') {
                console.log(ListData)
            } else if (obj.type === 'edit') {

            } else {
                console.log(ListData)
            }
        }
    })
    // 分页渲染
    function pageRender(){
        //调用分页
        layPage.render({
            elem: 'pageTest',
            count: afterFilterTableData.length,
            layout: ['count', 'prev', 'page', 'next', 'limit'],
            jump: obj =>{
                //表格渲染
                search(obj.curr, obj.limit, obj.pages)
            }
        })
    }
    // 表格渲染
    function tableRender(){
        table.render({
            elem: '#testTable',
            url:'',
            data: currentTable,
            cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            cols: [[
                {field:'id', title: 'ID', sort: true},
                {field:'username', title: '用户名'}, //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
                {field:'sex', title: '性别', sort: true},
                {field:'city', title: '城市'},
                {field:'sign', title: '签名'},
                {field:'classify', title: '职业', align: 'center'}, //单元格内容水平居中
                {field:'experience', title: '积分', sort: true, align: 'right'}, //单元格内容水平居中
                {field:'score', title: '评分', sort: true, align: 'right'},
                {field:'wealth', title: '财富', sort: true, align: 'right'},
                {fixed: 'right', title: '操作', width:100, align:'center', toolbar: '#tableBar'}
            ]]
        })
        //监听工具条
        table.on('tool(testTable)', obj =>{
            console.log(obj)
            layer.msg('hello world');
            /*var data = obj.data;
            if(obj.event === 'detail'){
                layer.msg('ID：'+ data.id + ' 的查看操作');
            } else if(obj.event === 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del();
                    layer.close(index);
                });
            } else if(obj.event === 'edit'){
                layer.alert('编辑行：<br>'+ JSON.stringify(data))
            }*/
        })
    }
    // 点击查询时数据过滤
    function getAfterConditionMsg(conditionObj) {
        afterFilterTableData = []
        if(tableData.length > 0) {
            for (const msg of tableData) {
                const username = msg.username.indexOf(conditionObj.username) !== -1
                const city = msg.city.indexOf(conditionObj.city) !== -1
                const experience= msg.experience.toString().indexOf(conditionObj.experience.toString()) !== -1
                const sex = msg.sex.indexOf(conditionObj.sex) !== -1
                if (username && city && experience&& sex) {
                    afterFilterTableData.push(msg)
                }
            }
        }
        tableRender()
        pageRender()
    }
    // 查询操作
    function search(gotoPage, limit, pages){
        currentTable = []
        // 根据查询条件过滤后分页
        if (afterFilterTableData.length < limit) {
            currentTable = afterFilterTableData
        } else {
            if (gotoPage < pages) {
                currentTable = afterFilterTableData.slice((gotoPage-1) * limit, gotoPage * limit)
            } else {
                currentTable = afterFilterTableData.slice((gotoPage-1) * limit, (gotoPage-1) * limit + afterFilterTableData.length%limit)
            }
        }
        tableRender()
    }
    // 页面初始化操作
    getAfterConditionMsg(refreshCondition)
})
