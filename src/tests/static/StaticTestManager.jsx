import React, { useEffect, useState } from "react";
import { OPTIONS_NAME } from "../optionsModel";
import { setUserOnDb } from "../../auth/authService";
import { useUser } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import StaticTest from "./StaticTest";
import ROUTES from "../../routes/routesModel";
const handleProductNames = (products) => {
  let productsNames = [];
  products.forEach((product) => {
    productsNames.push(OPTIONS_NAME["OPTION" + product]);
  });
  return productsNames;
};
function getRandomWeighted() {
  const weights = [28, 18, 15, 12, 9, 7, 5, 3, 2, 1];
  const cumulativeWeights = [];
  let sum = 0;

  // Create cumulative weights array
  for (let weight of weights) {
    sum += weight;
    cumulativeWeights.push(sum);
  }

  // Get a random number between 0 and the sum of weights
  const randomNum = Math.random() * sum;

  // Find the number corresponding to the random number
  for (let i = 0; i < cumulativeWeights.length; i++) {
    if (randomNum < cumulativeWeights[i]) {
      return i;
    }
  }
}
export default function StaticTestManager({ couples }) {
  const [timeTaken, setTimeTaken] = useState(null);
  const [isExampleDone, setIsExampleDone] = useState(false);

  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const choosePrize = (choices) => {
    let rnd = Math.floor((Math.random() - 0.01) * (choices.length + 5));
    if (rnd < 5) {
      return user.preferencesStage1[rnd].win;
    }

    return choices[getRandomWeighted()];
  };

  const handleDone = async (rankedProducts) => {
    let productsNames = handleProductNames(rankedProducts);

    await setUserOnDb({
      ...user,
      preferencesStage2: productsNames,
      stage: 3,
      testNumber: 6,
      timeTaken: (Date.now() - timeTaken) / 1000,
      stage2Timestamp: Date.now(),
      prize: choosePrize(productsNames),
    });
    setUser((prev) => ({
      ...prev,
      preferencesStage2: productsNames,
      stage: 3,
      testNumber: 6,
    }));
    navigate(ROUTES.FEEDBACK);
  };
  useEffect(() => {
    if (!timeTaken) {
      setTimeTaken(Date.now());
    }
  }, [timeTaken]);
  console.log(user);
  if (!isExampleDone) {
    return (
      <div>
        <StaticTest
          title={"Preliminary stage"}
          handleDone={() => {
            setIsExampleDone(true);
            setTimeTaken(Date.now());
          }}
          couples={[
            [10, 11],
            [12, 13],
          ]}
        />
      </div>
    );
  } else {
    return (
      <div>
        <StaticTest key="realTest" handleDone={handleDone} couples={couples} />
      </div>
    );
  }
}
