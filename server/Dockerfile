FROM python:3.11.10-slim


ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Set the working directory in docker
WORKDIR /app


RUN apt-get update && \
    apt-get install -y \
      gcc \
      default-libmysqlclient-dev \
      pkg-config \
      curl && \
    apt-get remove -y \
      gcc \
      pkg-config && \
    rm -rf /var/lib/apt/lists/*


# Install any dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --no-deps -r requirements.txt

ENV APP_HOME=/home/app/web

# Copy the content of the local src directory to the working directory
RUN mkdir -p $APP_HOME/static $APP_HOME/media

WORKDIR $APP_HOME  

# copy project
COPY . $APP_HOME



# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]