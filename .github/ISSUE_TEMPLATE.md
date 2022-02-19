---
title: Automated Issue - {{ env.TITLE }}
labels: test
---

Someone just pushed! Here's who did it: {{ payload.sender.login }}.

[Check test report here.]({{ env.TEST_REPORT_URL }})
[Check coverage report here.]({{ env.COVERAGE_REPORT_URL }})
