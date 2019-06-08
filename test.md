# Markdown example

## Headings

#Example heading 1

Example heading 1
=================

## Example heading 2

Example heading 2
-----------------

### Example heading 3 ###

#### Example heading 4 #

##### Example heading 5

###### Example heading 6

-----

## Paragraphs

Example paragraph.

Paragraph with `inline code`.

Paragraph with ``literal backtick (`) hack``. Neat.

Encoded HTML entities: `<div>no&nbsp;breaks</div>`.

-----

## Lists

- List
- Items
- Even with `inline code`
- Even
    - Embedded
        - So
            - Many
                - Levels
            - I cannot
        - Even
    - Follow
- Wicked

* List
* Items
* Even with `inline code`
* Even
    * Embedded
        * So
            * Many
                * Levels
            * I cannot
          * Even
    * Follow
* Wicked

+ List
+ Items
+ Even with `inline code`
+ Even
    + Embedded
        + So
            + Many
                + Levels
            + I cannot
          + Even
    + Follow
+ Wicked

1. List
2. Items
3. Even with `inline code`
4. Even
    1. Embedded
        1. So
            1. Many
                1. Levels
            2. I cannot
        2. Even
    2. Follow
5. Wicked

+ List
+ Items
+ Even with `inline code`
+ Even
    1. Embedded
        + So
            1. Many
                + Levels
            2. I cannot
        + Even
    2. Follow
+ Wicked

*   This is a list item with two paragraphs.

    This is the second paragraph in the list item.
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

*   Another item in the same list.

1.  This is a list item with two paragraphs.

    This is the second paragraph in the list item.
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

2. Another item in the same list.

-----

## HTML

<div style='color: red;'>Look Mom, HTML!</div>

-----

## Emphasis

Emphasis _all_ __four__ *possible* **ways**. Also in the middle of very**long**words.

## Thematic break

-----

## Images

![Alt text](http://www.placecage.com/200/200)

Some text.

![Alt text](http://www.placecage.com/200/200 "Optional title")

Some text.

![Alt text][imageid1]

Some text.

![Alt text][imageid2]

Some text.

[imageid1]: http://www.placecage.com/200/200
[imageid2]: http://www.placecage.com/200/200 "Optional title"

-----

## Block quotations

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
>
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

Some text

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.

Some text

> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

Some text

> ## This is a header.
>
> 1. This is the first list item.
> 2. This is the second list item.
>
> Some paragraph with `inline code` and **emphasis**

-----

## Links

This is [an example inline link](http://example.com/ "Title").

[This link](http://example.net/) has no title attribute.

See my [About](/about/) page for details.

This is [an example reference-style link][id].

[This link **has emphasis**](http://example.net/) has no title attribute.

[![Alt text](http://www.placecage.com/200/200)](http://example.net/)

[id]: http://example.com/  "Optional Title Here"

Auto link test http://example.com/

Auto link test with email@address.com

---

## Code blocks

This is a normal paragraph:

    This is a code block.

Here is an example of AppleScript:

    tell application "Foo"
        beep
    end tell

Here is an example of JavaScript:
```js
const numbers = [1, 2, 3]
const doubles = numbers
    .map(
        number => number * 2
    )
```

```html
<div>
    <p>Encoded HTML entities, no&nbsp;breaks.</p>
    <script>
        const numbers = [1, 2, 3]
        const doubles = numbers
            .map(
                number => number * 2
            )
    </script>
</div>
```

---

## Backslash escaping

\# Not a heading

\*Not an emphasis\*

\+ Not a list
\+ Still not a list

\* Not a list
\* Still not a list

\- Not a list
\- Still not a list

\> Not a blockquote
\> Not a blockquote

This is \[not a lint link](http://example.com/ "Title").

\!\[Not an image](http://www.placecage.com/200/200)

1986\. What a great season.
