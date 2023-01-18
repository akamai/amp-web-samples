import React from "react";
import './CodeSample.css'

function CodeSample(props) {
    class PreFormattedCode extends React.Component {
        render() {
          return <React.Fragment>{props.script}</React.Fragment>
        }
    }

    return (
        <div>
        <h3 className="CodeSample-h3">{props.title}</h3>
            <pre>
                <code className="CodeSample-code">
                    <PreFormattedCode />
                </code>
            </pre>
        </div>
    )
}
export default CodeSample;