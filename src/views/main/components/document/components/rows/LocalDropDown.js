import { MenuItem } from "@mui/material"
import React from "react"
import { DropDown } from "../../../../../../common/components"

const LocalDropDown = React.forwardRef(({ values, onClose, open, onSelect }, ref) => {
    return (
        <DropDown onClose={onClose} open={open} position="top-start" ref={ref}>
            <span>
                {Array.isArray(values) &&
                    values.length > 0 &&
                    values.map((value) => (
                        <MenuItem onClick={() => onSelect(value)} key={value._id}>
                            {value.name}
                        </MenuItem>
                    ))}
            </span>
        </DropDown>
    )
})

export default LocalDropDown
