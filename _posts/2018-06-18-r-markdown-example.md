---
layout: post
title: "R Markdown"
---

This is a test for an Jekyll post rendered by R markdown

Let's see some math:

$$ n! = \prod\limits_{i=1}^{n} i $$

Which entails for $n\in\mathbb{N}$:

$$ n! = n \cdot (n-1)! $$

Now let's check out some code


{% highlight python %}
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)
{% endhighlight %}

now let's see the magic of RMD:

```python
for n in range(5):
    print(factorial(n))
```

```
1
1
2
6
24
```

That's all folks.
