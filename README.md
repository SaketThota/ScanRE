
<p align="center">
<img src="https://github.com/SaketThota/ScanRE/assets/52862591/ad8dd62a-4959-4958-888c-1b46acb71ccb" width="50%"></img>
<br>
</p>

# Features:

![image](https://github.com/SaketThota/ScanRE/assets/52862591/019fd04a-946b-41e3-a6ee-fde36d149cef)
 

# What was our motivation?
To help improve the security posture of open sourced software in the industry :)

![image](https://user-images.githubusercontent.com/52862591/234079995-43c5a83b-a1cc-420b-838c-1f0e86343d93.png)

* Most of modern infrastructure relies on open-source software.
* Developers blindly import and use vulnerable code.
* Most people aren’t aware of best practices.
* Finding vulnerabilities is a mostly manual and tedious process.

## What is Static Code Analysis?

Static analysis is a method of debugging that is done by automatically examining the source code without having to execute the program. This provides developers with an understanding of their code base and helps ensure that it is compliant, safe, and secure. To find defects and violations of policies, checkers perform an analysis on the code.

![image](https://user-images.githubusercontent.com/52862591/234088790-64ded29a-f35e-4b25-a862-c59dced2fd71.png)

They operate by querying or traversing the model, looking for particular properties or patterns that indicate defects. Sophisticated symbolic execution techniques explore paths through a control-flow graph. The data structure representing paths that might be traversed by a program during its execution. A warning is generated, if the path exploration notices an anomaly.

To model and explore the astronomical number of combinations of circumstances, scanners employ a variety of strategies to ensure scalability. For example, procedures summaries are refined and compacted during the analysis, and paths are explored in an order that minimizes paging. 


# Architecture:
- The project contains 2 broad directories.

```
*
├───mh-backend
└───mh-frontend
```
The backend was written in Python, i.e. using the Flask framework and the frontend was written using React. Detailed instructions can be found in the individual directories on setting up the project.

## A high level layout of our system is shown below.

![image](https://github.com/SaketThota/ScanRE/assets/52862591/1bd84919-1906-443c-b951-b808eeed7476)

### Individual components:
</br>
* <a href="https://github.com/oss-review-toolkit/ort/">The OSS Review Toolkit (ORT)</a> is a FOSS policy automation and orchestration toolkit which you can use to manage your (open source) software dependencies in a strategic, safe and efficient manner.
<br>
* <a href="https://github.com/returntocorp/semgrep">Semgrep</a> is a fast, open-source, static analysis engine for finding bugs, detecting vulnerabilities in third-party dependencies, and enforcing code standards. Semgrep analyzes code locally on your computer or in your build environment: code is never uploaded.
<br>
We've made extensive use of docker and celery to ensure that we are able to tackle the asynchronous nature of our task, i.e. scanning multiple files of code, each having different sizes across multiple repositories. A high level architecture of celery is shown below.

![image](https://github.com/SaketThota/ScanRE/assets/52862591/7d8b168f-b4b3-43ea-aa6b-2964876097c2)

We decided to go ahead and integrate these two, i.e. semgrep and ORT together with ChatGPT (GPT-4) so that we could ensure that we get the best of all worlds (Scanning user code as well as that of dependencies as well as get suggested mitigations) And that was the heart of our solution. It reduces alert fatigue, allows the security team to focus on what matters and helps the team better utilize existing resources. A win-win all round :)

# Screens:
* Prompt the user to enter a GitHub or GitLab URL
![image](https://github.com/SaketThota/ScanRE/assets/52862591/4cb86960-8401-4876-8545-c09f625387c2)

* A few facts to keep the user engaged
![image](https://github.com/SaketThota/ScanRE/assets/52862591/8ef7a0f4-3263-4607-adb6-3aab9dab06a5)

* Overview of scan results
![image](https://github.com/SaketThota/ScanRE/assets/52862591/90742370-f753-4b8c-b510-dbacad987743)

* List of findings
![image](https://github.com/SaketThota/ScanRE/assets/52862591/2e1fe903-d39a-456b-bf8e-1130604c0d83)

* Results in an easy to understand format along with severity, likelihood, file path and line number in which the vulnerability was detected, the CWE details and suggested mitigation stratergy as well as past scan findings and vulnerability tracking.
![image](https://github.com/SaketThota/ScanRE/assets/52862591/f54eb52b-0585-44dd-95f7-749f26e9deb8)

# Performance metrics:
It made sense to include benchmarks to show expected performance from our system :)
The time taken to complete a scan is totally dependent on the olume of code being scanned.
Since the underlying system is primarily built on top of SemGrep, our performance is mainly determined by the performance of SemGrep. Semgrep is able to outperform GitGuardian and other code analysis tools, both, in terms of time taken and false positives flagged.

![image](https://user-images.githubusercontent.com/52862591/234083312-6bc6cec7-0312-45ef-ab36-a55b3f381efd.png)

Tree matching has a nearly negligible cost when compared to most deep program analysis techniques, such as pointer analysis or symbolic execution, so this was clearly a winning battle. As Semgrep grew more advanced, more features were added which caused it to err closer to the side of semantics, such as taint analysis and constant propagation.

These analyses are not necessarily ones that can be done quickly. Taint analysis, in particular, requires running dataflow analysis over the entire control flow of a program, which can potentially be huge, when considering how large an entire codebase may be, with all of its function calls and tricky control flow logic. To do taint analysis in this way would be to pick a losing battle.

Semgrep succeeds in that it only carries out single-file analysis, so the control flow graph never exceeds the size of a file. In addition, taint can be done incrementally. Functions have well-defined points where they begin and end, as well as generally well-defined entrances in terms of the data they accept (the function arguments). Thus, Semgrep collects taint summaries, which essentially (per function) encode the information about what taint may be possible, depending on the taint of the inputs that flow in.
![image](https://user-images.githubusercontent.com/52862591/234083232-4af327b3-5f37-4611-af16-237a73a128d6.png)

## References:

* https://nullcon.net/goa-2022/hack-the-source
* https://nullcon.net/goa-2022/unearthing-malicious-and-other-risky-open-source-packages-using-packj
* https://nullcon.net/goa-2022/raining-CVEs-on-wordpress-plugins-with-semgrep
* https://semgrep.dev/blog/2022/static-analysis-speed
* https://core-research-team.github.io/2020-03-01/Celery-Flask-30e28a8974974f6cb55ed0c07d042671

## Team members:

* <a href="https://www.linkedin.com/in/tusharnankani/">Tushar Nankhani</a> 
* <a href="https://www.linkedin.com/in/saket-thota/">Saket Thota</a>
* <a href="https://www.linkedin.com/in/hardikraheja/">Hardik Raheja</a>
* <a href="https://www.linkedin.com/in/jaden-furtado/">Jaden Furtado</a>

### We're almost certain we've forgotten something 😇