import React from 'react';
import './ConsoleSample.css'
function ConsoleSample(props) {
    return (
        <div>
            <h3 className='ConsoleSample-h3'>{props.title}</h3>
            <pre>
                <code className='ConsoleSample-code'>{props.command}</code>
            </pre>
        </div>
    )
}
export default ConsoleSample;