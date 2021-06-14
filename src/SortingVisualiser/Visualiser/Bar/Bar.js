import './Bar.css'

import React, { useState } from 'react'

/*
    A Bar has a height which is used for sorting
*/

export default function Bar({height}) {
    return (
        <div className="bar" style={{height: height}}></div>
    )
}
