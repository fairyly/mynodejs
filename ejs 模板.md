# ejs

* GitHub: https://github.com/mde/ejs

* Installation
```
  $ npm install ejs
```

### 输出值
```
<%=item.value %>
```

### 输出 HTML 字符串标签内容

```
<%-item.content %>
```

### tag 

```
Tags
<% 'Scriptlet' tag, for control-flow, no output
<%_ 'Whitespace Slurping' Scriptlet tag, strips all whitespace before it
<%= Outputs the value into the template (escaped)
<%- Outputs the unescaped value into the template
<%# Comment tag, no execution, no output
<%% Outputs a literal '<%'
%%> Outputs a literal '%>'
%> Plain ending tag
-%> Trim-mode ('newline slurp') tag, trims following newline
_%> 'Whitespace Slurping' ending tag, removes all whitespace after it
For the full syntax documentation, please see docs/syntax.md.
```
