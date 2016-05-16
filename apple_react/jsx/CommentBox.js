var Aninput,CommentBox,val = "Hello, world! I am a CommentBox.",tpl = <h1>Hello, world!</h1>;
Aninput = React.createClass({
	getInitialState:function(){//初始化数据	
		var id = this.props.id?this.props.id:'radio-';
		return {"checked":!!this.props.checked,"id":id,"name":id};
	},	
	render: function() {
		return (<input type = "radio"
			name = {this.props.name}
			id = {this.props.id}
			value = {this.props.value}
			checked = {this.state.checked}/>
			);
	}	
});
CommentBox = React.createClass({
	propTypes:{
		value:React.PropTypes.string,
		choices:React.PropTypes.array.isRequired,
		onCompleted:React.PropTypes.func.isRequired,
	},	
	renderChoices:function(){
		return this.props.choices.map(function(choice,i){
			return Aninput({
				name:this.state.id,
				id:"choice-"+i,
				label:choice,
				value:choice,
				checked:this.state.value === choice
			}.bind(this));
		});
	},
	getSurveyId:function(){
		return "myreact";
	},
	getIsComplete:function(){
		return this.state.isComplete?'is-complete':'';
	},
	handleClick:function(event){//点击之后修改state.isComplete的值进而影响渲染数据
		this.setState({isComplete:!this.state.isComplete});
	},
	settpl:function(data){
		var options = [];
		for(var i=0, length=data.length; i<length; i++){
			options.push(<span value={i}>{data[i].value}</span>);
		}
		return options;
	},	
	getDefaultProps:function(){		
		return{"date":new Date()};
	},		    	
	getInitialState:function(){//初始化数据	
		return {id:'multip-',value:this.props.value,"isComplete":true,"options":this.settpl(this.props.options)};
	},
	componentDidMount:function(){//首次渲染调用
		console.log(this.getDOMNode());//获取DOM结构
	},
	componentWillReceiveProps:function(nextProps){//如果外部修改数据源执行
		this.setState({"options":this.settpl(this.props.options)});		
	},
	render: function() {
		var isComplete = this.getIsComplete();
		var day = this.props.date.getDay();
		var styles = {width:'240px',height:'50px',backgroundColor:"#999"}
		return (<div onClick={this.handleClick} id={this.getSurveyId()} className={isComplete} style={styles}>{val}{day}{this.state.options}{this.renderChoices()}</div>);
	}
});
React.render(tpl,document.getElementById('example'));
var options = [{value:1},{value:2},{value:3},{value:4}];
var choices = [{"id":1,"label":"选项","choice":"单选框"},{"id":1,"label":"选项","choice":"单选框"},{"id":1,"label":"选项","choice":"单选框"}];
var commentbox = React.render(<CommentBox choices={choices}  options={options} />,document.getElementById('content'));
options.push({value:5},{value:6});
setTimeout(function(){//延迟更新数据
	commentbox.setProps({"options":options});
}, 2000);
