import{_ as l,c as s,o,a}from"./app.8e4af7d4.js";var e="/documents/assets/url\u89E3\u6790.14cdc12c.png";const h=JSON.parse('{"title":"HTTP","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u4ECE\u8F93\u5165url\u5230\u5C55\u793A\u9875\u9762\u7684\u5168\u8FC7\u7A0B","slug":"_1-\u4ECE\u8F93\u5165url\u5230\u5C55\u793A\u9875\u9762\u7684\u5168\u8FC7\u7A0B"},{"level":2,"title":"2. TCP\u4E09\u6B21\u63E1\u624B/\u56DB\u6B21\u6325\u624B","slug":"_2-tcp\u4E09\u6B21\u63E1\u624B-\u56DB\u6B21\u6325\u624B"},{"level":2,"title":"3. \u8FDB\u7A0B\u548C\u7EBF\u7A0B\u7684\u533A\u522B","slug":"_3-\u8FDB\u7A0B\u548C\u7EBF\u7A0B\u7684\u533A\u522B"},{"level":2,"title":"5. HTTP\u534F\u8BAE\u53CA\u5404\u4E2A\u7248\u672C\u53F7","slug":"_5-http\u534F\u8BAE\u53CA\u5404\u4E2A\u7248\u672C\u53F7"},{"level":2,"title":"5. IPv4\u548CIPv6","slug":"_5-ipv4\u548Cipv6"}],"relativePath":"frontend/http.md","lastUpdated":1686647519000}'),n={name:"frontend/http.md"},p=a('<h1 id="http" tabindex="-1">HTTP <a class="header-anchor" href="#http" aria-hidden="true">#</a></h1><h2 id="_1-\u4ECE\u8F93\u5165url\u5230\u5C55\u793A\u9875\u9762\u7684\u5168\u8FC7\u7A0B" tabindex="-1">1. \u4ECE\u8F93\u5165url\u5230\u5C55\u793A\u9875\u9762\u7684\u5168\u8FC7\u7A0B <a class="header-anchor" href="#_1-\u4ECE\u8F93\u5165url\u5230\u5C55\u793A\u9875\u9762\u7684\u5168\u8FC7\u7A0B" aria-hidden="true">#</a></h2><ol><li><p>URL\u89E3\u6790</p><ul><li>\u534F\u8BAE+ip+\u7AEF\u53E3+\u8DEF\u5F84+\u53C2\u6570+\u951A\u70B9</li></ul><img src="'+e+`" style="zoom:67%;"></li><li><p>DNS\u67E5\u8BE2\uFF0C\u83B7\u53D6ip</p><ul><li>\u5148\u8BBF\u95EE\u672C\u5730host\u6587\u4EF6\u3001\u7136\u540E\u662F\u672C\u5730\u57DF\u540D\u670D\u52A1\u5668\u3001\u6839\u670D\u52A1\u5668\u3001....</li><li>\u8FC7\u7A0B\u4E2D\u6D89\u53CA\u9012\u5F52\u67E5\u8BE2\u548C\u8FED\u4EE3\u67E5\u8BE2</li><li>\u76EE\u7684\u662F\u83B7\u53D6ip\u5730\u5740</li></ul></li><li><p>\u5EFA\u7ACBTCP\u8FDE\u63A5</p><ul><li>TCP\u4E09\u6B21\u63E1\u624B\uFF0CTCP\u9762\u5411\u8FDE\u63A5\u7684\u534F\u8BAE</li></ul></li><li><p>\u53D1\u9001HTTP\u8BF7\u6C42</p><ul><li>\u8BF7\u6C42\u884C\u3001\u8BF7\u6C42\u5934\u3001\u8BF7\u6C42\u4F53</li><li>\u8BF7\u6C42\u884C\u5305\u62EC\uFF1A\u8BF7\u6C42\u65B9\u5F0F\u3001\u8BF7\u6C42\u5730\u5740\u548Chttp\u534F\u8BAE\u53CA\u7248\u672C</li></ul></li><li><p>\u62FF\u5230HTTP\u54CD\u5E94\u7ED3\u679C</p><ul><li>\u72B6\u6001\u884C\u3001\u54CD\u5E94\u5934\u3001\u54CD\u5E94\u4F53</li></ul></li><li><p>\u6E32\u67D3\u9875\u9762</p><ul><li>\u89E3\u6790HTML\uFF0C\u6784\u5EFADOM\u6811</li><li>\u89E3\u6790CSS\uFF0C\u5EFA\u7ACBCSS\u89C4\u5219\u6811</li><li>\u5408\u5E76DOM\u6811\u548Ccss\u89C4\u5219\u6811\uFF0C\u751F\u6210render\u6811</li><li>\u5E03\u5C40render\u6811\uFF0C\u8D1F\u8D23\u5404\u5143\u7D20\u7684\u5C3A\u5BF8\u548C\u4F4D\u7F6E\u7684\u8BA1\u7B97</li><li>\u7ED8\u5236render\u6811\uFF0C\u7ED8\u5236\u9875\u9762\u50CF\u7D20\u4FE1\u606F</li><li>\u6D4F\u89C8\u5668\u4F1A\u5C06\u5404\u5C42\u7684\u4FE1\u606F\u53D1\u9001\u7ED9 GPU\uFF0CGPU \u4F1A\u5C06\u5404\u5C42\u5408\u6210\uFF08 composite \uFF09\uFF0C\u663E\u793A\u5728\u5C4F\u5E55\u4E0A</li></ul></li></ol><h2 id="_2-tcp\u4E09\u6B21\u63E1\u624B-\u56DB\u6B21\u6325\u624B" tabindex="-1">2. TCP\u4E09\u6B21\u63E1\u624B/\u56DB\u6B21\u6325\u624B <a class="header-anchor" href="#_2-tcp\u4E09\u6B21\u63E1\u624B-\u56DB\u6B21\u6325\u624B" aria-hidden="true">#</a></h2><ul><li>**\u4E09\u6B21\u63E1\u624B\uFF1A**\u4E3A\u4E86\u4F7F\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u5EFA\u7ACB\u53EF\u9760\u8FDE\u63A5\uFF0C\u786E\u4FDD\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u7684\u53D1\u9001\u548C\u63A5\u6536\u80FD\u529B\u5747\u662F\u6B63\u5E38\u7684\u3002 <ol><li>\u7B2C\u4E00\u6B21\u63E1\u624B\uFF1A\u5BA2\u6237\u7AEF\u53D1\u9001SYN\u62A5\u6587\uFF0C\u5E76\u6307\u660E\u5BA2\u6237\u7AEF\u7684\u521D\u59CB\u5E8F\u5217\u53F7ISN\uFF0C</li><li>\u7B2C\u4E8C\u6B21\u63E1\u624B\uFF1A\u670D\u52A1\u7AEF\u63A5\u6536SYN\u62A5\u6587\uFF0C\u53D1\u9001\u81EA\u5DF1\u7684SYN\u62A5\u6587\u7ED9\u5BA2\u6237\u7AEF\uFF0C\u5E76\u5C06\u5BA2\u6237\u7AEF\u7684ISN+1\u4F5C\u4E3AACK\u7684\u503C\uFF0C\u53D1\u7ED9\u5BA2\u6237\u7AEF</li><li>\u7B2C\u4E09\u6B21\u63E1\u624B\uFF1A\u5BA2\u6237\u7AEF\u63A5\u6536SYN\u62A5\u6587\uFF0C\u7136\u540E\u53D1\u9001ACK\u62A5\u6587\uFF0CACK\u7684\u503C\u4E3A\u670D\u52A1\u7AEF\u7684ISN+ 1\u3002\u6B64\u65F6\u5BA2\u6237\u7AEF\u5904\u4E8EEstablish\u72B6\u6001\uFF0C\u670D\u52A1\u7AEF\u63A5\u6536\u5230\u62A5\u6587\u540E\uFF0C\u4E5F\u4F1A\u5904\u4E8EEstablish\u72B6\u6001</li></ol></li><li><strong>\u4E3A\u4EC0\u4E48\u4E0D\u9002\u7528\u4E8C\u6B21\u63E1\u624B\uFF1F</strong><ul><li>\u56E0\u4E3A\u53EA\u63E1\u624B\u4E24\u6B21\u7684\u8BDD\uFF0C\u670D\u52A1\u7AEF\u6CA1\u529E\u6CD5\u786E\u8BA4\u5BA2\u6237\u7AEF\u7684\u63A5\u6536\u80FD\u529B</li></ul></li><li><strong>\u56DB\u6B21\u6325\u624B\uFF1A</strong><ol><li>\u7B2C\u4E00\u6B21\u6325\u624B\uFF1A\u5BA2\u6237\u7AEF\u53D1\u9001FIN\u62A5\u6587\uFF0C\u62A5\u6587\u4E2D\u6709\u81EA\u5DF1\u7684ISN</li><li>\u7B2C\u4E8C\u6B21\u6325\u624B\uFF1A\u670D\u52A1\u7AEF\u63A5\u6536\u5BA2\u6237\u7AEF\u7684FIN\u62A5\u6587\uFF0C\u7ED9\u5BA2\u6237\u7AEF\u53D1\u9001ACK\u62A5\u6587\uFF0Cack\u7684\u503C\u4E3A\u5BA2\u6237\u7AEF\u7684ISN+1.\u544A\u8BC9\u5BA2\u6237\u7AEF\u81EA\u5DF1\u6536\u5230\u4E86FIN\u62A5\u6587</li><li>\u7B2C\u4E09\u6B21\u6325\u624B\uFF1A\uFF08\u9700\u8981\u7B49\u5230\u670D\u52A1\u7AEF\u7684\u62A5\u6587\u53D1\u9001\u5B8C\u6BD5\uFF09\uFF0C\u670D\u52A1\u7AEF\u7ED9\u5BA2\u6237\u7AEF\u53D1\u9001FIN\u62A5\u6587\uFF0C\u81EA\u5DF1\u7684ISN</li><li>\u7B2C\u56DB\u6B21\u6325\u624B\uFF1A\u5BA2\u6237\u7AEF\u6536\u5230FIN\u62A5\u6587\u540E\uFF0C\u53D1\u9001ACK\u62A5\u6587\u4F5C\u4E3A\u5E94\u7B54\uFF0Cack\u7684\u503C\u4E3A\u670D\u52A1\u7AEF\u62A5\u6587\u7684ISN+ 1\u3002\u6B64\u65F6\u5BA2\u6237\u7AEF\u5904\u4E8ETIME-WATI\u72B6\u6001\uFF0C\u9700\u8FC7\u4E00\u6BB5\u65F6\u95F4\u786E\u4FDD\u670D\u52A1\u7AEF\u6536\u5230\u81EA\u5DF1\u7684ACK\u62A5\u6587\u540E\u624D\u4F1A\u8FDB\u5165closed\u72B6\u6001\u3002\u670D\u52A1\u7AEF\u6536\u5230ACK\u62A5\u6587\u540E\u5C31\u7ACB\u9A6C\u5904\u4E8Eclosed\u72B6\u6001</li></ol></li><li><strong>\u4E3A\u4EC0\u4E48\u8981\u56DB\u6B21\u6325\u624B\uFF1F</strong><ul><li>\u670D\u52A1\u7AEF\u63A5\u6536\u5230\u5BA2\u6237\u7AEF\u7684\u65AD\u5F00\u8FDE\u63A5\u7684FIN\u62A5\u6587\u540E\uFF0C\u5E76\u4E0D\u4F1A\u7ACB\u523B\u65AD\u5F00\u8FDE\u63A5\uFF0C\u800C\u662F\u5148\u53D1\u4E00\u4E2AACK\u62A5\u6587\u544A\u8BC9\u5BA2\u6237\u7AEF\u6536\u5230\u5173\u95ED\u8FDE\u63A5\u7684\u8BF7\u6C42\u3002\u7B49\u5230\u670D\u52A1\u5668\u6240\u6709\u7684\u62A5\u6587\u53D1\u9001\u5B8C\u6BD5\u4E4B\u540E\uFF0C\u624D\u53D1\u9001FIN\u62A5\u6587\u65AD\u5F00\u8FDE\u63A5\u3002</li></ul></li></ul><h2 id="_3-\u8FDB\u7A0B\u548C\u7EBF\u7A0B\u7684\u533A\u522B" tabindex="-1">3. \u8FDB\u7A0B\u548C\u7EBF\u7A0B\u7684\u533A\u522B <a class="header-anchor" href="#_3-\u8FDB\u7A0B\u548C\u7EBF\u7A0B\u7684\u533A\u522B" aria-hidden="true">#</a></h2><ul><li>**\u8D44\u6E90\u5360\u7528\uFF1A**\u8FDB\u7A0B\u662F\u64CD\u4F5C\u7CFB\u7EDF\u5206\u914D\u8D44\u6E90\u7684\u57FA\u672C\u5355\u4F4D\uFF0C\u7EBF\u7A0B\u662F\u8FDB\u7A0B\u4E2D\u7684\u4E00\u4E2A\u6267\u884C\u5355\u5143\uFF0C\u6BCF\u4E2A\u8FDB\u7A0B\u62E5\u6709\u72EC\u7ACB\u7684\u5730\u5740\u7A7A\u95F4\u548C\u7CFB\u7EDF\u8D44\u6E90\u3002\u4E00\u4E2A\u8FDB\u7A0B\u5185\u53EF\u4EE5\u6709\u591A\u4E2A\u7EBF\u7A0B\uFF0C\u7EBF\u7A0B\u5171\u4EAB\u8FDB\u7A0B\u5185\u7684\u5185\u5B58</li><li><strong>\u7CFB\u7EDF\u8C03\u5EA6</strong>\uFF1A\u64CD\u4F5C\u7CFB\u7EDF\u901A\u8FC7\u8C03\u5EA6\u8FDB\u7A0B\u63A7\u5236\u5757\u6765\u7BA1\u7406\u548C\u8C03\u5EA6\u8FDB\u7A0B\u3002\u7EBF\u7A0B\u7531\u8FDB\u7A0B\u521B\u5EFA\u548C\u9500\u6BC1\uFF0C\u4E0D\u7531\u64CD\u4F5C\u7CFB\u7EDF\u76F4\u63A5\u8C03\u5EA6</li><li><strong>\u5F00\u9500\u7684\u533A\u522B</strong></li></ul><h2 id="_5-http\u534F\u8BAE\u53CA\u5404\u4E2A\u7248\u672C\u53F7" tabindex="-1">5. HTTP\u534F\u8BAE\u53CA\u5404\u4E2A\u7248\u672C\u53F7 <a class="header-anchor" href="#_5-http\u534F\u8BAE\u53CA\u5404\u4E2A\u7248\u672C\u53F7" aria-hidden="true">#</a></h2><p>\uFF08HTTP1.0\u662F\u77ED\u94FE\u63A5\uFF0C\u4E00\u6B21\u8FDE\u63A5\u8BF7\u6C42\u6210\u529F\uFF0C\u5B8C\u6210\u53D1\u9001\u548C\u63A5\u6536\u6570\u636E\u6210\u529F\u540E\uFF0C\u5C31\u65AD\u5F00\u4E86\u8FDE\u63A5\uFF0C\u8FD9\u6837\u5EFA\u7ACB\u8FDE\u63A5\u7684\u6D88\u8017\u6BD4\u8F83\u5927\u3002\u6240\u4EE5\u5728HTTP1.0\u7684\u57FA\u7840\u4E0A\uFF0CHTTP1.1\u4F7F\u7528\u4E86\u957F\u8FDE\u63A5\uFF0C\u5728\u4E00\u4E2ATCP\u8FDE\u63A5\u4E0A\u53EF\u4EE5\u4F20\u9001\u591A\u4E2AHTTP\u8BF7\u6C42\u548C\u54CD\u5E94\uFF0CHTTP2.0\u57281.0\u7684\u7248\u672C\u4E0A\uFF0C\u589E\u52A0\u4E86\u591A\u8DEF\u590D\u7528\uFF0C\u5C31\u662F1.1\u4E2DHTTP\u8BF7\u6C42\u662F\u7531\u987A\u5E8F\u7684\uFF0C\u4E0B\u4E00\u4E2Ahttp\u8BF7\u6C42\u5FC5\u987B\u7B49\u5230\u524D\u4E00\u4E2A\u8BF7\u6C42\u7ED3\u675F\u540E\uFF0C\u624D\u53EF\u4EE5\u53D1\u9001\u3002\u591A\u8DEF\u590D\u7528\u5C31\u662F\u6307HTTP\u8BF7\u6C42\u662F\u5E76\u884C\u53D1\u9001\u7684\uFF0C\u9664\u4E86\u591A\u8DEF\u590D\u7528\uFF0Chttp2.0\u8FD8\u589E\u52A0\u4E86\u5934\u90E8\u538B\u7F29\uFF0C\u4F7F\u7528\u4E8C\u8FDB\u5236\u7684\u89E3\u6790\u65B9\u5F0F\u66FF\u4EE3http1.0\u4E2D\u7684\u5B57\u7B26\u4E32\u7684\u89E3\u6790\u65B9\u5F0F\uFF0C\u89E3\u51B3\u4E86\u89E3\u6790\u4E0A\u7684\u7F3A\u9677\u3002\u8FD8\u6709\u5C31\u662F\u670D\u52A1\u7AEF\u63A8\u9001\uFF0C\uFF09</p><ol><li>Http1.0\uFF1Atcp\u662F\u77ED\u94FE\u63A5\uFF0C\u8FDE\u63A5\u6210\u529F\u4F7F\u7528\u540E\uFF0C\u5C31\u65AD\u5F00\u8FDE\u63A5\uFF08\u6BCF\u6B21\u5EFA\u7ACB\u8FDE\u63A5\u9700\u8981\u82B1\u8D39\u65F6\u95F4\uFF0C\u9020\u6210\u5EF6\u8FDF\uFF09</li><li>HTTP1.1\uFF1A\u957F\u8FDE\u63A5\uFF1A\u4E00\u4E2ATCP\u8FDE\u63A5\u4E0A\u53EF\u4EE5\u4F20\u9001\u591A\u4E2AHTTP\u8BF7\u6C42\u548C\u54CD\u5E94</li><li>HTTP2.0\uFF1A\u957F\u8FDE\u63A5+\u591A\u8DEF\u590D\u7528 <ul><li><strong>\u591A\u8DEF\u590D\u7528</strong>\uFF1A\u5728\u4E00\u4E2ATCP\u8FDE\u63A5\u4E0A\uFF0C\u591A\u4E2AHTTP\u8BF7\u6C42\u53EF\u4EE5\u5E76\u884C\u53D1\u9001\uFF08\u5728HTTP1.1\u4E2Dhttp\u8BF7\u6C42\u5FC5\u987B\u7B49\u4E0A\u4E00\u4E2A\u8BF7\u6C42\u5B8C\u6210\u540E\uFF0C\u624D\u80FD\u53D1\u9001\uFF09</li><li><strong>header\u538B\u7F29</strong>\uFF1AHTTP1.x\u4E2D\u7684\u5934\u90E8\u5E26\u6709\u5927\u91CF\u7684\u4FE1\u606F\uFF0C\u6BCF\u6B21\u90FD\u8981\u91CD\u590D\u53D1\u9001\u3002HTTP2.0\u4F7F\u7528encoder\u51CF\u5C11\u9700\u8981\u4F20\u8F93\u7684header\u7684\u5927\u5C0F\uFF0C\u901A\u8BAF\u53CC\u65B9\u5404\u81EAcache\u4E00\u4EFDheader fields\u8868\uFF0C<strong>\u65E2\u907F\u514D\u4E86\u91CD\u590Dheader\u7684\u4F20\u8F93</strong>\uFF0C\u53C8<strong>\u51CF\u5C0F\u4E86\u9700\u8981\u4F20\u8F93\u7684\u5927\u5C0F\u3002</strong>\uFF08HTTP2.0\u53EF\u4EE5\u7EF4\u62A4\u4E00\u4E2A\u5B57\u5178\uFF0C\u5DEE\u91CF\u66F4\u65B0HTTP\u5934\u90E8\uFF09</li><li>**\u670D\u52A1\u7AEF\u63A8\u9001\uFF1A**\u670D\u52A1\u7AEF\u63A8\u9001\u80FD\u628A\u5BA2\u6237\u7AEF\u6240\u9700\u8981\u7684\u8D44\u6E90\u4F34\u968F\u7740index.html\u4E00\u8D77\u53D1\u9001\u5230\u5BA2\u6237\u7AEF\uFF0C\u7701\u53BB\u4E86\u5BA2\u6237\u7AEF\u91CD\u590D\u8BF7\u6C42\u7684\u6B65\u9AA4\u3002\u670D\u52A1\u7AEF\u53EF\u4EE5\u4E3B\u52A8\u53D1\u8D77\u4E00\u4E9B\u6570\u636E\u63A8\u9001\u3002\u6BD4\u5982\uFF0C\u670D\u52A1\u7AEF\u5728\u63A5\u6536\u5230\u6D4F\u89C8\u5668\u53D1\u6765\u7684 <code>HTML</code> \u8BF7\u6C42\u7684\u540C\u65F6\uFF0C\u53EF\u4EE5\u4E3B\u52A8\u63A8\u9001\u76F8\u5173\u7684\u8D44\u6E90\u6587\u4EF6\uFF08js/css\uFF09\u7ED9\u5BA2\u6237\u7AEF\uFF0C\u5E76\u884C\u53D1\u9001\uFF0C\u63D0\u9AD8\u7F51\u9875\u7684\u4F20\u8F93\u548C\u6E32\u67D3\u6548\u7387\u3002</li><li><code>HTTP1.x</code> \u7684\u89E3\u6790\u662F\u57FA\u4E8E\u6587\u672C\uFF0C\u5B58\u5728\u89E3\u6790\u4E0A\u7684\u7F3A\u9677\uFF1B\u800C <code>HTTP2.0</code> \u76F4\u63A5\u4F7F\u7528<strong>\u4E8C\u8FDB\u5236\u7684\u89E3\u6790\u65B9\u5F0F</strong>\u6765\u66FF\u4EE3 <code>HTTP 1.X</code> \u7684\u5B57\u7B26\u4E32\u89E3\u6790\uFF0C\u66F4\u4E3A\u9AD8\u6548\u548C\u5065\u58EE\u3002</li></ul></li><li>HTTP\u6027\u80FD\u4F18\u5316\uFF1A <ul><li>\u5408\u7406\u4F7F\u7528 <code>HTTP</code> \u7684\u7F13\u5B58\u7B56\u7565\uFF0C\u907F\u514D\u540C\u4E00\u8D44\u6E90\u591A\u6B21\u8BF7\u6C42\u670D\u52A1\u7AEF\u800C\u5BFC\u81F4\u7684\u989D\u5916\u6027\u80FD\u5F00\u9500</li><li>\u5C3D\u91CF\u4F7F\u7528 <code>HTTP</code> \u957F\u8FDE\u63A5\uFF0C\u907F\u514D\u6BCF\u6B21\u91CD\u5EFA <code>TCP</code> \u8FDE\u63A5\u5E26\u6765\u7684\u65F6\u95F4\u635F\u8017</li><li>\u5C3D\u91CF\u4F7F\u7528 <code>HTTPS</code> \u6765\u4FDD\u8BC1\u7F51\u7EDC\u4F20\u8F93\u7684\u5B89\u5168\u6027\u3002</li><li>\u53EF\u4EE5\u4F7F\u7528 <code>HTTP2</code> \u6765\u5927\u5E45\u63D0\u9AD8\u6570\u636E\u4F20\u8F93\u7684\u6548\u7387\uFF0C\u4F7F\u7528 <code>server push</code> \u5F00\u542F <code>HTTP2</code> \u7684\u670D\u52A1\u7AEF\u63A8\u9001\u529F\u80FD</li><li>\u5BA2\u6237\u7AEF\u5F00\u542F <code>Accept-Encoding</code> \u538B\u7F29\u65B9\u5F0F\u7684\u652F\u6301\uFF0C\u670D\u52A1\u7AEF\u4F20\u8F93\u538B\u7F29\u540E\u7684\u6587\u4EF6\uFF0C\u51CF\u5C11\u4F20\u8F93\u6570\u636E\u7684\u5927\u5C0F</li></ul></li><li>HTTP\u548CHTTPS <ul><li>\u52A0\u5BC6\uFF1AHttps\u76F8\u6BD4\u4E8Ehttp\uFF0C\u589E\u52A0\u4E86SSL\u52A0\u5BC6\u89E3\u5BC6\u6570\u636E\u7684\u8FC7\u7A0B\u3002http\u660E\u6587\u4F20\u8F93</li><li><strong>\u7AEF\u53E3</strong>\uFF1Ahttp\u7AEF\u53E3\u662F80\uFF0Chttps\u7AEF\u53E3\u662F443</li><li><strong>\u9632\u52AB\u6301</strong></li><li><strong>\u8BC1\u4E66</strong>\uFF1Ahttps\u9700\u8981\u670D\u52A1\u5668\u7AEF\u4F7F\u7528\u6570\u5B57\u8BC1\u4E66\uFF0C\u8BC1\u4E66\u7531\u53D7\u4FE1\u4EFB\u7684\u8BC1\u4E66\u9881\u53D1\u673A\u6784CA\u7B7E\u540D</li></ul></li></ol><h2 id="_5-ipv4\u548Cipv6" tabindex="-1">5. IPv4\u548CIPv6 <a class="header-anchor" href="#_5-ipv4\u548Cipv6" aria-hidden="true">#</a></h2><ul><li><p>IPv4\u7531\u56DB\u90E8\u5206\u7EC4\u6210\uFF0C\u6BCF\u90E8\u5206\u662F\u4E00\u4E2A\u5B57\u8282\uFF0C8\u4F4D\uFF0C\u53EF\u8868\u793A\u7684\u8303\u56F4\u662F0\u5230255\u3002\u603B\u5171\u56DB\u4E2A\u5B57\u8282</p><ul><li>\u6B63\u5219\u8868\u8FBE\u5F0F\uFF1A\u5148\u5339\u914D\u524D\u9762\u4E09\u4E2A\u6570\uFF0C\u8303\u56F40\u5230255\u4E4B\u95F4\uFF0C\u5E76\u4E14\u6709\u70B9\u53F7\u3002\u6700\u540E\u4E00\u4E2A\u65700\u5230255\u4E4B\u95F4\uFF0C\u7ED3\u5C3E\\</li><li>\u5339\u914D0\u5230255\u4E4B\u95F4\u7684\u6570\uFF1A\u53EF\u4EE5\u5206\u4E3A\u51E0\u90E8\u5206 <ul><li>200\u5230255\u4E4B\u95F4\uFF1A<code>2[0-5][0-5]</code></li><li>100\u5230199\uFF1A<code>1\\d\\d</code></li><li>10\u523099\uFF1A <code>[1-9]\\d</code></li><li>0\u52309\uFF1A <code>\\d</code></li></ul></li></ul><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">^</span><span style="color:#A6ACCD;">(((</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">][</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">] </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">\\d\\d </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">9</span><span style="color:#A6ACCD;">]\\d </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> \\d )</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">{</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)()$</span></span>
<span class="line"></span></code></pre></div></li><li><p>IPv6\u7531\u516B\u90E8\u5206\u7EC4\u6210\uFF0C\u6BCF\u90E8\u5206\u75314\u4E2A16\u8FDB\u5236\u7EC4\u6210\uFF0C\u4E00\u4E2A16\u8FDB\u5236\u9700\u75284\u4F4D\u6765\u8868\u793A\uFF0C4\u4E2A16\u8FDB\u5236\u9700\u89812\u4E2A\u5B57\u8282\u3002\u6240\u4EE5IPv6\u753116\u4E2A\u5B57\u8282\u7EC4\u6210</p><ul><li>\u6B63\u5219\u8868\u8FBE\u5F0F\uFF1AIPv6\u524D\u97620\u53EF\u4EE5\u7701\u7565\uFF0C</li></ul><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">^</span><span style="color:#A6ACCD;">([</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">9a</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">fA</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">F]</span><span style="color:#89DDFF;">{</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">:)</span><span style="color:#89DDFF;">{</span><span style="color:#F78C6C;">7</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">[</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">9a</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">fA</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">F]</span><span style="color:#89DDFF;">{</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">$</span></span>
<span class="line"></span></code></pre></div></li></ul>`,12),t=[p];function i(r,c,d,C,T,D){return o(),s("div",null,t)}var y=l(n,[["render",i]]);export{h as __pageData,y as default};
