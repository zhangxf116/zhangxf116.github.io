/**
 * Created by Administrator on 2016/9/22.
 * 首页核心JS
 */
$(function(){
    //左侧导航的动画效果
    $(".baseUI>li>a").off("click");
    $(".baseUI>li>a").on("click",function(){
        $(".baseUI>li>ul").slideUp();
        $(this).next().slideDown(300)
    });
    //默认收起全部
    $(".baseUI>li>ul").slideUp();
    $(".baseUI>li>a").eq(0).trigger("click");

    $(".baseUI>li>ul>li").off();
    $(".baseUI>li>ul>li").on("click",function(){
        if(!$(this).hasClass("current")){
            $(".baseUI>li>ul>li").removeClass("current");
            $(this).addClass("current")
        }
    });
    $(".baseUI>li>ul>li>a").eq(0).trigger("click")
});
//核心模块
angular.module("app",["ng","ngRoute","app.subject","app.paper"])
    //核心模块控制器
    .controller("mainCtrl",["$scope",function($scope){

    }])
    //路由设置 (用于数据的增删改查)
    .config(["$routeProvider",function($routeProvider){
 
        $routeProvider.when("/AllSubject/a/:a/b/:b/c/:c/d/:d",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectController"
        }).when("/SubjectManger",{
            templateUrl:"tpl/subject/subjectManger.html",
            controller:"subjectController"
        }).when("/SubjectAdd",{
            templateUrl:"tpl/subject/subjectAdd.html",
            controller:"subjectController"
        }).when("/SubjectDel/id/:id",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectDelController"
        }).when("/SubjectCheck/id/:id/state/:state",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectCheckController"
        }).when("/PaperList",{
            templateUrl:"tpl/paper/paperManager.html",
            controller:"paperListController"
        }).when("/PaperAdd/id/:id/stem/:stem/type/:type/topic/:topic/level/:level",{
            templateUrl:"tpl/paper/paperAdd.html",
            controller:"paperAddController"
        }).when("/PaperSubjectList",{
            templateUrl:"tpl/paper/subjectList.html",
            controller:"subjectController"
        })
    }])