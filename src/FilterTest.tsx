import React from 'react'
//FilterTest.tsx
const FilterTest: React.FC = () => {
    const name = "hobby";
    const value = "음악"; // 체크가 안된 값
    const checked = false;
    const selectedHobbies = ["독서", "운동", "음악"];
    const result = {
        [name]:checked?value:selectedHobbies.filter(h => h !== value)
    }
    console.log(result)
    return (
        <div>
            <h1>Filter Test</h1>
        </div>
    )
}

export default FilterTest