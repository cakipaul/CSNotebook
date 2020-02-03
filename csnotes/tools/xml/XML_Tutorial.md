# XML Tutorial

- [source](https://www.javatpoint.com/xml-tutorial)

## What is xml

- Xml (eXtensible Markup Language) is a mark up language.
- XML is designed to store and transport data.
- Xml was released in late 90’s. it was created to provide an easy to use and store self describing data.
- XML became a W3C Recommendation on February 10, 1998.
- XML is **NOT** a replacement for HTML.
- XML is designed to be **self-descriptive**.
- XML is designed to **carry** data, **not to display** data.
- XML tags are **not predefined**. You must define your own tags.
- XML is platform independent and language independent.

## XML Related Technologies

1. XHTML: Extensible html. It is a clearer and stricter version of XML. It belongs to the family of XML markup languages. It was developed to make html more extensible and increase inter-operability with other data.
2. 

## XML Validation

XML file can be validated by 2 ways:

- against DTD
- against XSD

DTD (Document Type Definition) and XSD (XML Schema Definition) are used to define XML structure.

### XML DTD

In our XML tutorial, you will learn about DTD file, creating xml with DTD, using CSS file, CDATA vs PCDATA and difference between DTD and XML schema.

Let's see an example of XML using DTD file.

*employee.xml*

```xml
<?xml version="1.0"?>  
<!DOCTYPE employee SYSTEM "employee.dtd">  
<employee>  
  <firstname>vimal</firstname>  
  <lastname>jaiswal</lastname>  
  <email>vimal@javatpoint.com</email>  
</employee>   
```
### XML Schema

In this XML tutorial, we will provide a detail description of schema file, XML schema validation, XML schema data types and XML parsers.

Let's see an example of XML using XSD file.

```xml
<?xml version="1.0"?>  
<employee  
xmlns="http://www.javatpoint.com"  
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
xsi:schemaLocation="http://www.javatpoint.com employee.xsd">  
  <firstname>vimal</firstname>  
  <lastname>jaiswal</lastname>  
  <email>vimal@javatpoint.com</email>  
</employee>  
```
