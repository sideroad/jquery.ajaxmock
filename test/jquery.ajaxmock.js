(function( $ ) {

module( "jquery.ajaxMock" );

asyncTest( "text", function() {
    var res = "mock, mocker, mockest!";
    expect( 1 );

    $.ajaxMock({
        url : "http://sideroad.secret.jp/text",
        dataType : "text",
        response : res
    });
    
    $.ajax({
        url : "http://sideroad.secret.jp/text",
        success : function( text ){
            equals( text, res);
            start();
        }
    });
});

asyncTest( "json", function() {
    var res = { fruits : [ "Apple", "Banana", "Grape" ] };
    expect( 1 );

    $.ajaxMock({
        url : "http://sideroad.secret.jp/json",
        dataType : "text",
        response : res
    });
    
    $.ajax({
        url : "http://sideroad.secret.jp/json",
        dataType : "json",
        success : function( json ){
            deepEqual( json, res);
            start();
        }
    });
});
asyncTest( "jsonp", function() {
    var res = { fruits : [ "Apple", "Banana", "Grape" ] };
    expect( 1 );

    $.ajaxMock({
        url : "http://sideroad.secret.jp/jsonp",
        dataType : "jsonp",
        response : res
    });
    
    $.ajax({
        url : "http://sideroad.secret.jp/jsonp",
        dataType : "jsonp",
        success : function( json ){
            deepEqual( json, res);
            start();
        }
    });
});


asyncTest( "filtering", function() {
    var res1 = { fruits : [ "Apple", "Banana", "Grape" ] },
        res2 = { animals : [ "Cat", "Dog" ] },
        data1 = {a:1,b:2},
        data2 = {a:1,b:2,c:3};
    expect( 2 );

    $.ajaxMock({
        url : "http://sideroad.secret.jp/json",
        dataType : "json",
        data : data1,
        response : res1
    });
    $.ajaxMock({
        url : "http://sideroad.secret.jp/json",
        dataType : "json",
        data : data2,
        response : res2
    });

    $.ajax({
        url : "http://sideroad.secret.jp/json",
        data : data1,
        success : function( json ){
            equals( json, res1);
        }
    });
    $.ajax({
        url : "http://sideroad.secret.jp/json",
        data : data2,
        success : function( json ){
            equals( json, res2);
            start();
        }
    });
});

asyncTest( "ignore", function() {
    var res = { fruits : [ "Apple", "Banana", "Grape" ] };
    expect( 2 );

    $.ajaxMock({
        url : "http://sideroad.secret.jp/json",
        dataType : "json",
        data : {a:1},
        ignore : [ "b", "c"],
        response : res
    });

    $.ajax({
        url : "http://sideroad.secret.jp/json",
        data : {a:1,b:2,c:3},
        success : function( json ){
            equals( json, res);
        }
    });
    $.ajax({
        url : "http://sideroad.secret.jp/json",
        data : {a:2},
        success : function( json ){
            equals( json, "");
            start();
        }
    });
});
asyncTest( "ignoreAll", function() {
    var res = { fruits : [ "Apple", "Banana", "Grape" ] };
    expect( 2 );

    $.ajaxMock({
        url : "http://sideroad.secret.jp/json",
        dataType : "json",
        ignoreAll : true,
        response : res
    });

    $.ajax({
        url : "http://sideroad.secret.jp/json",
        data : {a:1,b:2,c:3},
        success : function( json ){
            equals( json, res);
        }
    });
    $.ajax({
        url : "http://sideroad.secret.jp/json",
        data : {a:2},
        success : function( json ){
            equals( json, res);
            start();
        }
    });
});

}( jQuery ) );