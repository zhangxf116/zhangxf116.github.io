/**
 * Created by Administrator on 2016/9/22.
 * 题目管理的模块
 */
angular.module("app.subject",["ng"])
    //审核
    .controller("subjectCheckController",["$routeParams","subjectService","$location",
        function($routeParams,subjectService,$location){
            subjectService.checkSubject($routeParams.id,$routeParams.state,function(data){
                alert(data)
            })
            $location.path("/AllSubject/a/0/b/0/c/0/d/0")
    }])
    //删除
    .controller("subjectDelController",["$routeParams","subjectService","$location",
        function($routeParams,subjectService,$location){
        var flag=confirm("确认删除吗？:");
            if(flag){
                var id=$routeParams.id;
                subjectService.delSubject(id,function(data){
                    alert(data)
                })
            }
         $location.path("/AllSubject/a/0/b/0/c/0/d/0")
    }])
    .controller("subjectController",["$scope","commonService","subjectService","$routeParams","$location",
        function($scope,commonService,subjectService,$routeParams,$location){
        //将路由参数绑定在作用域当中
        $scope.params=$routeParams;
        console.log($routeParams);
        //添加页面绑定的对象
        $scope.subject={
                typeId:3,
                levelId:1,
                deparentmentId:1,
                topicId:1,
                stem:"",
                answer:"",
                analysis:"",
                choiceContent:[],
                choiceCorrect:[false,false,false,false]
        };
        $scope.submit=function(){
                subjectService.saveSubject($scope.subject,function(data){
                    alert(data);
                });
                //重置
                var subject={
                    typeId:3,
                    levelId:1,
                    deparentmentId:1,
                    topicId:1,
                    stem:"",
                    answer:"",
                    analysis:"",
                    choiceContent:[],
                    choiceCorrect:[false,false,false,false]
                };
                angular.copy(subject,$scope.subject)
            };
            $scope.submitAndClose=function() {
                subjectService.saveSubject($scope.subject,function(data) {
                    alert(data);
                });
                //跳转到列表页面
                $location.path("/AllSubject/a/0/b/0/c/0/d/0")
            };
        //获取所有的题目类型
        commonService.getAllTypes(function(data){
            $scope.types=data;
        });
        commonService.getAllLevel(function(data){
            $scope.types1=data;
        });
        commonService.getAllDepartmentes(function(data){
            $scope.types2=data;
        });
        commonService.getAllTopics(function(data){
            $scope.types3=data;
        });
         //获取所有的题目信息
        subjectService.getAllSubject($routeParams,function(data){
            $scope.subjects=data;
            data.forEach(function(subject){
                var answer=[];
                //更改编号
                subject.choices.forEach(function(choice,index){
                    choice.no=commonService.convertIndexToNo(index);
                });
                    subject.choices.forEach(function(choice){
                        if(choice.correct){
                            answer.push(choice.no)
                        }
                    });
                    //修改当前题目的answer值
                    subject.answer=answer.toString();
            })
        });
    }])
    .service("subjectService",["$http","$httpParamSerializer",function($http,$httpParamSerializer){
        this.checkSubject=function(id,state,handler){
            $http.get("http://172.16.0.5:7777/test/exam/manager/checkSubject.action",{
                params:{
                    'subject.id':id,
                    'subject.checkState':state
                }
            }).success(function(data){
                handler(data)
            })
        }
        this.delSubject=function(id,handler){
            $http.get("http://172.16.0.5:7777/test/exam/manager/delSubject.action",{
                params:{
                    'subject.id':id
                }
            }).success(function(data){
                handler(data)
            })
        }
        this.saveSubject=function(params,handler){
            var obj={};
            //处理数据
            for(var key in params){
                console.log(params)
                var val=params[key];
                console.log(key)
                console.log(val)
                switch(key){
                    case "typeId":
                        obj["subject.subjectType.id"]=val;
                        break;
                    case "levelId":
                        obj["subject.subjectLevel.id"]=val;
                        break;
                    case "deparentmentId":
                        obj["subject.department.id"]=val;
                        break;
                    case "topicId":
                        obj["subject.topic.id"]=val;
                        break;
                    case "stem":
                        obj["subject.stem"]=val;
                        break;
                    case "answer":
                        obj["subject.answer"]=val;
                        break;
                    case "analysis":
                        obj["subject.analysis"]=val;
                        break;
                    case "choiceContent":
                        obj["choiceContent"]=val;
                        break;
                    case "choiceCorrect":
                        obj["choiceCorrect"]=val;
                        break;
                }
            }
            //对obj对象进行表单格式序列化操作，（默认使用JSON格式）
            obj=$httpParamSerializer(obj);
            $http.post("http://172.16.0.5:7777/test/exam/manager/saveSubject.action", obj,{
                //指定请求头
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            }).success(function(data){
                handler(data)
            })
        }
        //获取所有题目信息
        this.getAllSubject=function(params,handler){
            var data={};
            for(var key in params){
                var val=params[key];
                if(val!=0){ 
                    switch(key){
                        case "a":
                            data["subject.subjectType.id"]=val;
                            break;
                        case "b":
                            data["subject.subjectLevel.id"]=val;
                            break;
                        case "c":
                            data["subject.department.id"]=val;
                            break;
                        case "d":
                            data["subject.topic.id"]=val;
                            break;
                    }
                }
            }
            //$http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjects.action",{
           $http.get("data/subjects.json",{
                params:data
            }).success(function(data){
                handler(data)
            })
        };
    }])
    .factory("commonService",["$http",function($http){
        return {
            convertIndexToNo:function(index){
                return  index==0?'A':(index==1?'B':(index==2?'C':(index==3?'D':'E')))
            },
            getAllTypes:function(handler){
                //$http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectType.action")
               $http.get("data/getAllSubjectType.json")
                .success(function(data){
                    handler(data);
                })
            },
            getAllLevel:function(handler){
                $http.get("data/getAllSubjectLevel.json")
                //$http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectLevel.action")
                    .success(function(data){
                        handler(data);
                    })
            },
            getAllDepartmentes:function(handler){
               $http.get("data/getAllDepartmentes.json")
                //$http.get("http://172.16.0.5:7777/test/exam/manager/getAllDepartmentes.action")
                    .success(function(data){
                        handler(data);
                    })
            },
            getAllTopics:function(handler){
                $http.get("data/getAllTopics.json")
                //$http.get("http://172.16.0.5:7777/test/exam/manager/getAllTopics.action")
                    .success(function(data){
                        handler(data);
                    })
            },
        }
    }])
    .filter("selectTopics",function () {
        return function(input,id){
            if(input){
                //Array.prototype.filter进行过滤
                var result=input.filter(function(item){
                    return item.department.id==id;
                });
                return result;
            }
        }
    })
    //指令的作用有操作dom和事件绑定
    .directive("selectOption",function(){
        return{
            restrict:"A",
            link:function(scope,element){
                element.on("change",function(){
                    var type=$(this).attr("type");
                    var val=$(this).val();
                    //当前元素是否被选中
                    var isCheck=$(this).prop("checked");
                    //设置值
                    if(type=="radio"){
                        //重置
                        scope.subject.choiceCorrect=[false,false,false,false];
                        for(var i=0;i<4;i++){
                            if(i==val){
                                scope.subject.choiceCorrect[i]=true;
                            }
                        }
                    }else if(type=="checkbox"){
                        for(var i=0;i<4;i++){
                            if(i==val){
                                if(isCheck){
                                    scope.subject.choiceCorrect[i]=true;
                                }else {
                                    scope.subject.choiceCorrect[i]=false
                                }
                            }
                        }
                    }
                    //强制消化 将scope能进行设置（双向数据绑定）
                    scope.$digest();
                });
            }
        }
    })