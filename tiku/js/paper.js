/**
 * Created by Administrator on 2016/9/28.
 * 试卷模块
 */
angular.module("app.paper",['ng','app.subject'])
    //试卷查询控制器
    .controller("paperListController",["$scope",function($scope){

    }])
    //试卷添加控制器
    .controller("paperAddController",["$scope","commonService","$routeParams","paperModel","paperService",
        function($scope,commonService,$routeParams,paperModel,paperService){
        commonService.getAllDepartmentes(function(data){
            $scope.department=data
        });
        var SubjectId=$routeParams.id;
        if(SubjectId!=0){
            //将要添加的题目的id添加到数组中
            paperModel.addSubjectId(SubjectId);
            paperModel.addSubject(angular.copy($routeParams));
        }
       
        $scope.pmodel=paperModel.model;
        $scope.savePaper=function(){
            paperService.savePaper($scope.pmodel,function(data){
                alert(data)
            })
        }
    }])
    //试卷删除控制器
    .controller("paperDelController",["$scope",function($scope){

    }])
    //保存数据
    .factory("paperService",["$http","$httpParamSerializer",function($http,$httpParamSerializer){
        return{
            savePaper:function(params,handler){
                var obj={};
                for(var key in params){
                    var val=params[key];
                    switch (key){
                        case 'departmentId':
                            obj["paper.department.id"]=val;
                            break;
                        case 'title':
                            obj["paper.title"]=val;
                            break;
                        case 'desc':
                            obj["paper.description"]=val;
                            break;
                        case 'at':
                            obj["paper.totalPoints"]=val;
                            break;
                        case 'total':
                            obj["paper.answerQuestionTime"]=val;
                            break;
                        case 'scores':
                            obj["scores"]=val;
                            break;
                        case 'subjectId':
                            obj["subjectIds"]=val;
                            break;
                    }
                }
                obj=$httpParamSerializer(obj);
                $http.post("http://172.16.0.5:7777/test/exam/manager/saveExamPaper.action", obj,{
                    //指定请求头
                    headers:{
                        "Content-Type":"application/x-www-form-urlencoded"
                    }
                }).success(function(data){
                    handler(data)
                })
            }
        }
    }])
   
    .factory("paperModel",function(){
        return{
            //模板 单例
            model:{
                departmentId:1, //方向id
                title:"",      //试卷标题
                desc:"",      //试卷说明
                at:0,        //考试时间
                total:0,     //考试总分
                scores:[],   //每个题目的分值
                subjectId:[], //添加题目的id
                subjects:[]  //添加stem/:stem/type/:type/topic/:topic/level/:level
            },
            addSubjectId:function (id) {
                this.model.subjectId.push(id)
            },
            addSubject:function (subject) {
                this.model.subjects.push(subject)
            }
        }
    })
